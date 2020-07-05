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

module Line = {
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
