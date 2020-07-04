open TrainingQueue;

type window;

[@bs.val] external self: window = "";
[@bs.set]
external setWorkerOnMessage: (window, ClientMessage.t => unit) => unit =
  "onmessage";
[@bs.val]
external postMessageFromWorker: workerMessage => unit = "postMessage";

/*
   1. Download training data
   2. Start calculating the gradient
   3. Send a message with gradient accuracy and error
 */

[@bs.val] external fetch: string => Js.Promise.t('a) = "fetch";
// returns a promise that resolves with an array of entries

module DataFetching = {
  open NIST;
  let parseImage = blob => {
    let ans = Array.make_matrix(28, 28, 0.0);
    let rec loop = ix =>
      switch (ix) {
      | ix when ix == 28 * 28 => ()
      | ix =>
        let r = ix / 28;
        let c = ix mod 28;
        ans[r][c] =
          Js.Typed_array.Uint8Array.unsafe_get(blob, ix)->float_of_int;
        loop(ix + 1);
      };
    loop(0);
    LinAlg.Matrix.make(ans);
  };

  let download = () => {
    Js.Promise.all2((
      fetch("t10k-images-idx3-ubyte"),
      fetch("t10k-labels-idx1-ubyte"),
    ))
    |> Js.Promise.then_(((images, labels)) =>
         Js.Promise.all2((images##blob(), labels##blob()))
       )
    |> Js.Promise.then_(((images, labels)) =>
         Js.Promise.all2((images##arrayBuffer(), labels##arrayBuffer()))
       )
    |> Js.Promise.then_(((images, labels)) => {
         Js.Promise.resolve(
           Array.init(10000, ix =>
             {
               digit:
                 Js.Typed_array.Uint8Array.make(
                   images##slice(28 * 28 * ix + 16, 16 + (ix + 1) * 28 * 28),
                 )
                 ->parseImage,
               label:
                 Js.Typed_array.Uint8Array.make(
                   labels##slice(ix + 8, 8 + ix + 1),
                 )
                 ->Js.Typed_array.Uint8Array.unsafe_get(_, 0),
             }
           ),
         )
       });
  };
};

module Initialize = {
  let massage = (entries: array(NIST.sample)) => {
    let m = Array.length(entries);
    let flatten = m => {
      let sz = 28 * 28;
      Array.init(sz, bit =>
        LinAlg.Matrix.get(bit / 28, bit mod 28, m) >= 1.0 ? 255.0 : 0.0
      );
    };
    let (x_m, norm) =
      LinAlg.Matrix.make(Array.init(m, ix => flatten(entries[ix].digit)))
      ->LinAlg.Matrix.add_col(1., _)
      ->ML.norm(_, ~ix=Array.init(28 * 28, ix => ix + 1), ());

    let y =
      LinAlg.Matrix.make(
        Array.init(
          m,
          ix => {
            let label = entries[ix].label;
            Array.init(10, il => il == label ? 1.0 : 0.0);
          },
        ),
      );
    let theta =
      LinAlg.Matrix.make(
        Array.init(28 * 28 + 1, _ => Array.init(10, _ => Random.float(1.))),
      );
    (
      x_m,
      y,
      theta,
      m =>
        LinAlg.Matrix.make([|flatten(m)|])
        ->LinAlg.Matrix.add_col(1.0, _)
        ->norm,
    );
  };
};

module WorkerState = {
  type state = {
    theta: LinAlg.Matrix.t,
    cost: LinAlg.Matrix.t,
    accuracy: float,
    normalizer: LinAlg.Matrix.t => LinAlg.Matrix.t,
  };
  let current = ref(None);

  let update = ((theta, cost, accuracy, normalizer)) => {
    current := Some({theta, cost, accuracy, normalizer});
  };

  let predict = sample =>
    switch (current^) {
    | None => LinAlg.Matrix.make([|Array.init(10, _ => 0.0)|])
    | Some({theta, normalizer}) =>
      ML.NIST.predict(theta, normalizer(sample))
    };
};

setWorkerOnMessage(self, m =>
  switch (ClientMessage.data(m)) {
  | Start(msg) =>
    Js.log(msg);
    Js.log("1. Started downloading images and labels");
    DataFetching.download()
    |> Js.Promise.then_(entries => {
         Js.log("2. Finish downloading");
         Js.log("3. Start Training");
         postMessageFromWorker(Ack(entries));
         let (x_m, y, theta, norm) = Initialize.massage(entries);
         let theta_ref = ref(theta);
         let epoch = ref(0);
         let rec loop = () =>
           epoch^ < 40
             ? {
               theta_ref := ML.LogReg.gradient_step(100.0, theta_ref^, x_m, y);
               let accuracy = ML.NIST.accuracy(theta_ref^, x_m, y);
               let cost = ML.LogReg.cost(theta_ref^, x_m, y);
               WorkerState.update((theta_ref^, cost, accuracy, norm));
               postMessageFromWorker(Update(theta_ref^, cost, accuracy));
               epoch := epoch^ + 1;
               Js.Global.setTimeout(loop, 100)->ignore;
             }
             : ();
         loop();
         Js.Promise.resolve(entries);
       })
    |> ignore;
  | Predict(sample) =>
    postMessageFromWorker(Prediction(sample, WorkerState.predict(sample)))
  }
);