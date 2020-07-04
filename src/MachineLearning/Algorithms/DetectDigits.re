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
  let getShuffle = () =>
    Memo.useStable(samples => {
      Random.init(Js.Date.now()->int_of_float);
      Belt.Array.shuffle(samples)
      ->Array.sub(_, 0, min(Array.length(samples), 5 * 10));
    });

  [@react.component]
  let make = (~samples: array(NIST.sample), ~onSelect) => {
    let (memoShuffle, setShuffle) = React.useState(getShuffle);
    <div>
      <div>
        <span> {React.string("Example of digits in the dataset")} </span>
        <span>
          <button onClick={_ => setShuffle(_ => getShuffle())}>
            {React.string("Shuffle")}
          </button>
        </span>
      </div>
      <div
        style={ReactDOMRe.Style.make(~display="flex", ~flexFlow="wrap", ())}>
        {Array.map(
           (e: NIST.sample) => {
             <span onClick={_ => onSelect(e.digit)}>
               <Digit dims=(65, 65) value={e.digit} />
             </span>
           },
           memoShuffle(samples),
         )
         ->React.array}
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

module ModelDebugging = {
  let getSparkline = (window, fn) => {
    Array.mapi((ix, p) => (float_of_int(ix), fn(p)), window)
    ->Array.to_list;
  };

  [@react.component]
  let make = (~params: array(MLEngine.training_params)) => {
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
  let make = (~prediction: MLEngine.prediction, ~onChange) => {
    let (_, setDigit) = React.useState(() => None);
    <div>
      <div> {React.string("Hello I predict stuff")} </div>
      <WriteDigit
        onChange={digit => {
          setDigit(_ => Some(digit));
          onChange(digit);
        }}
      />
      {switch (prediction) {
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

[@react.component]
let make = () => {
  let ({training, prediction}: MLEngine.state, genPrediction) =
    MLEngine.use();
  <span>
    <DigitGallery samples={training.samples} onSelect=genPrediction />
    <ModelDebugging params={training.params} />
    <Prediction prediction onChange=genPrediction />
  </span>;
};
