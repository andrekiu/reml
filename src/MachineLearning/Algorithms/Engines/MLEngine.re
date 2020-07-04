type input =
  | Idle
  | Predicting(LinAlg.Matrix.t)
  | Predicted(LinAlg.Matrix.t, LinAlg.Matrix.t);

type training_params = {
  theta: LinAlg.Matrix.t,
  cost: LinAlg.Matrix.t,
  accuracy: float,
};

type training = {
  samples: array(NIST.sample),
  params: array(training_params),
};

type state = {
  training,
  to_predict: input,
  send_to_worker: TrainingQueue.clientMessage => unit,
};
type action =
  | WorkerStarted(TrainingQueue.clientMessage => unit)
  | Update(LinAlg.Matrix.t, LinAlg.Matrix.t, float)
  | SetSamples(array(NIST.sample))
  | Predicted(LinAlg.Matrix.t, LinAlg.Matrix.t);

let reducer = (state, action: action) =>
  switch (action) {
  | WorkerStarted(w) => {...state, send_to_worker: w}
  | SetSamples(s) => {
      ...state,
      training: {
        ...state.training,
        samples: s,
      },
    }
  | Update(theta, cost, accuracy) => {
      ...state,
      training: {
        ...state.training,
        params:
          Array.append(state.training.params, [|{theta, cost, accuracy}|]),
      },
    }
  | Predicted(sample, pred) =>
    Js.log(pred);
    {...state, to_predict: Predicted(sample, pred)};
  };

let use = () => {
  let (state, dispatch) =
    React.useReducer(
      reducer,
      {
        training: {
          samples: [||],
          params: [||],
        },
        to_predict: Idle,
        send_to_worker: _ => (),
      },
    );

  React.useEffect0(() => {
    let (workerDispatcher, cleanup) =
      TrainingQueue.NISTClient.start(msg =>
        switch (msg) {
        | Ack(samples) => dispatch(SetSamples(samples))
        | Update(theta, cost, accuracy) =>
          dispatch(Update(theta, cost, accuracy))
        | Prediction(sample, pred) => dispatch(Predicted(sample, pred))
        }
      );
    dispatch(WorkerStarted(workerDispatcher));
    Some(cleanup);
  });

  (state, state.send_to_worker);
};
