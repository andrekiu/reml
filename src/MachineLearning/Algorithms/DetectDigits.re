let forn = (fn, n) => {
  let rec loop = ix =>
    switch (ix) {
    | ix when ix == n => ()
    | ix =>
      fn(ix);
      loop(ix + 1);
    };
  loop(0);
};

module Digit = {
  let unit = ((sz, _)) => {
    1. /. 28. *. float_of_int(sz);
  };
  let pointInCanvas = ((r, c), dims) => {
    let side = unit(dims);
    (float_of_int(r) *. side, float_of_int(c) *. side);
  };

  [@react.component]
  let make = (~dims: (int, int), ~value) => {
    let side = unit(dims);
    <span>
      <Canvas dims>
        {(ctx, _) => {
           forn(
             idx => {
               let (row, col) = (idx / 28, idx mod 28);
               let value = LinAlg.Matrix.get(row, col, value);
               Stylus.draw_square(
                 ctx,
                 pointInCanvas((col, row), dims),
                 side,
                 255.0 -. value,
               );
             },
             28 * 28,
           );
         }}
      </Canvas>
    </span>;
  };
};

type entry = {
  image: Js.Typed_array.Uint8Array.t,
  label: int,
};

module WriteDigit = {
  let massage = p => {
    let m = LinAlg.Matrix.make(Array.init(28, _ => Array.init(28, _ => 0.0)));
    let sz = 100.0 /. 28.0;
    List.iter(
      ((x, y)) => {
        let (nx, ny) = (int_of_float(x /. sz), int_of_float(y /. sz));
        if (nx < 0 || nx >= 28 || ny < 0 || ny >= 28) {
          ();
        } else {
          LinAlg.Matrix.set(ny, nx, 255.0, m);
        };
      },
      p,
    );
    m;
  };

  [@react.component]
  let make = (~onChange: LinAlg.Matrix.t => unit) => {
    let dims = (100, 100);
    <Canvas dims writeble=true onChange={p => onChange(massage(p))}>
      {(_, _) => {}}
    </Canvas>;
  };
};

module DigitGallery = {
  let shuffle = samples => {
    Random.init(Js.Date.now()->int_of_float);
    Belt.Array.shuffle(samples)
    ->Array.sub(_, 0, min(Array.length(samples), 5 * 10));
  };
  [@react.component]
  let make = (~samples: array(NIST.sample), ~onSelect) => {
    let dims = (65, 65);
    let (selection, setSelection) = React.useState(() => shuffle(samples));
    React.useEffect1(
      () => {
        setSelection(s => Array.length(s) == 0 ? shuffle(samples) : s);
        None;
      },
      [|samples|],
    );
    let views =
      Array.map(
        (e: NIST.sample) => {
          <span onClick={_ => onSelect(e.digit)}>
            <Digit dims value={e.digit} />
          </span>
        },
        selection,
      );
    <div>
      <div>
        <span> {React.string("Example of digits in the dataset")} </span>
        <span>
          <button onClick={_ => setSelection(_ => shuffle(samples))}>
            {React.string("Shuffle")}
          </button>
        </span>
      </div>
      <div
        style={ReactDOMRe.Style.make(~display="flex", ~flexFlow="wrap", ())}>
        {React.array(views)}
      </div>
    </div>;
  };
};

module LineChart = {
  [@react.component]
  let make = (~dims, ~values) => {
    let points = values;
    <Canvas dims>
      {(ctx, scale) =>
         List.length(points) > 0
           ? {
             let (t, _) = scale(Array.of_list(points), dims);
             Stylus.draw_line(ctx, List.map(t, points), ());
           }
           : ()}
    </Canvas>;
  };
};

type training_params = {
  theta: LinAlg.Matrix.t,
  cost: LinAlg.Matrix.t,
  accuracy: float,
};

module ModelDebugging = {
  let getSparkline = (window, fn) => {
    Array.mapi((ix, p) => (float_of_int(ix), fn(p)), window)
    ->Array.to_list;
  };

  [@react.component]
  let make = (~params: array(training_params)) => {
    let epoch = Array.length(params);
    let window =
      Array.sub(
        params,
        max(0, Array.length(params) - 20),
        min(20, Array.length(params)),
      );
    <div>
      <div> {React.string("Viz the convergence")} </div>
      <div
        style={ReactDOMRe.Style.make(
          ~display="flex",
          ~flexFlow="wrap",
          ~alignItems="center",
          ~justifyContent="center",
          (),
        )}>
        <div style={ReactDOMRe.Style.make(~marginRight="20px", ())}>
          {React.string({j|Epoch : $epoch|j})}
        </div>
        <LineChart
          dims=(500, 100)
          values={getSparkline(window, p => p.accuracy)}
        />
      </div>
      <div
        style={ReactDOMRe.Style.make(~display="flex", ~flexFlow="wrap", ())}>
        {React.array(
           Array.init(10, digit =>
             <div>
               <div> {React.string({j|$digit|j})} </div>
               <LineChart
                 dims=(137, 137)
                 values={getSparkline(window, p =>
                   LinAlg.Matrix.get(0, digit, p.cost)
                 )}
               />
             </div>
           ),
         )}
      </div>
    </div>;
  };
};

module Bar = {
  let rec texp = n =>
    switch (n) {
    | 0 => 1.
    | (-1) => 1. /. 10.
    | n =>
      let x = texp(n / 2);
      x *. x *. (n mod 2 == (-1) ? 1. /. 10. : 1.);
    };
  [@react.component]
  let make = (~sz, ~value) => {
    <Canvas dims=(sz, 20)>
      {(ctx, _) => {
         Array.iteri(
           (ix, e) =>
             value >= e
               ? Stylus.draw_square(
                   ctx,
                   (float_of_int(ix) *. 20., 0.0),
                   20.,
                   255. -. 255. /. 10. *. float_of_int(ix),
                 )
               : (),
           [|
             texp(-150),
             texp(-100),
             texp(-50),
             texp(-20),
             texp(-10),
             texp(-5),
             0.0001,
             0.001,
             0.01,
             0.5,
           |],
         );
       }}
    </Canvas>;
  };
};

type input =
  | Idle
  | Predicting(LinAlg.Matrix.t)
  | Predicted(LinAlg.Matrix.t, LinAlg.Matrix.t);

module Prediction = {
  let column = () => {
    ReactDOMRe.Style.make(
      ~display="flex",
      ~flexDirection="column",
      ~flex="1",
      (),
    );
  };

  [@react.component]
  let make = (~toPredict, ~onChange) => {
    let (_, setDigit) = React.useState(() => None);
    <div>
      <div> {React.string("Hello I predict stuff")} </div>
      <WriteDigit
        onChange={digit => {
          setDigit(_ => Some(digit));
          onChange(digit);
        }}
      />
      {switch (toPredict) {
       | Predicted(sample, prediction) =>
         <div style={ReactDOMRe.Style.make(~display="flex", ())}>
           <div>
             {Array.init(10, ix => LinAlg.Matrix.get(0, ix, prediction))
              ->Array.mapi(
                  (ix, v: float) => {
                    let round =
                      Js.Float.toPrecisionWithPrecision(v, ~digits=5);
                    <div
                      style={ReactDOMRe.Style.make(
                        ~display="flex",
                        ~width="100%",
                        ~flexDirection="row",
                        (),
                      )}>
                      <span style={column()}>
                        {React.string({j|$ix : $round|j})}
                      </span>
                      <span style={column()}> <Bar sz=200 value=v /> </span>
                    </div>;
                  },
                  _,
                )
              ->React.array}
           </div>
           <Digit dims=(100, 100) value=sample />
         </div>
       | _ => <span />
       }}
    </div>;
  };
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

let useWebWorker = () => {
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
        | _ => Js.log(msg)
        }
      );
    dispatch(WorkerStarted(workerDispatcher));
    Some(cleanup);
  });

  state;
};

module LambdaSlider = {
  [@react.component]
  let make = (~lambda, ~onChange) => {
    <input
      defaultValue=lambda
      onBlur={v =>
        onChange(Js.Float.fromString(ReactEvent.Focus.target(v)##value))
      }
    />;
  };
};

[@react.component]
let make = () => {
  let (lambda, setLambda) = React.useState(() => 0.0);
  let state = useWebWorker();
  <span>
    <DigitGallery
      samples={state.training.samples}
      onSelect={e => state.send_to_worker(TrainingQueue.Predict(e))}
    />
    <div>
      <LambdaSlider
        lambda={string_of_float(lambda)}
        onChange={v => setLambda(_ => v)}
      />
      <button> {React.string("Start")} </button>
    </div>
    <ModelDebugging params={state.training.params} />
    <Prediction
      toPredict={state.to_predict}
      onChange={e => state.send_to_worker(TrainingQueue.Predict(e))}
    />
  </span>;
};
