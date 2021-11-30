module Fit = {
  let forn = (n, fn) => {
    let rec loop = ix =>
      switch ix {
      | ix if ix == n => ()
      | ix =>
        fn(ix)
        loop(ix + 1)
      }
    loop(0)
  }
  let near_boundary = (x1, theta) => {
    let residual = LinAlg.Matrix.get(0, 0, theta) +. LinAlg.Matrix.get(1, 0, theta) *. x1

    -.residual /. LinAlg.Matrix.get(2, 0, theta)
  }

  let get_color = (n, y) => {
    let (_, cols) = LinAlg.Matrix.size(y)
    let rec loop = ix =>
      switch ix {
      | ix if ix == cols => -1
      | ix => int_of_float(LinAlg.Matrix.get(n, ix, y)) == 1 ? ix : loop(ix + 1)
      }
    loop(0)
  }

  @react.component
  let make = (~x_m, ~y, ~theta) => {
    let dims = (400, 400)
    let pallete = ["green", "blue", "red", "black", "purple", "gray"]
    <Canvas dims>
      {(ctx, scale) => {
        let (rows, _) = LinAlg.Matrix.size(x_m)
        let points = Array.init(rows, ix => (
          (LinAlg.Matrix.get(ix, 1, x_m), LinAlg.Matrix.get(ix, 2, x_m)),
          get_color(ix, y),
        ))
        let (t, (low, high)) = scale(Array.map(fst, points), dims)
        Array.iter(p => Stylus.draw_point(ctx, t(fst(p)), ~color=pallete[snd(p)], ()), points)
        let (_, pred) = LinAlg.Matrix.size(theta)
        forn(pred, ix => {
          let line = List.map(
            e => (e, near_boundary(e, LinAlg.Matrix.get_col(ix, theta)))->t,
            list{low, high},
          )
          Stylus.draw_line(ctx, line, ~color=pallete[ix], ())
        })
      }}
    </Canvas>
  }
}

module Train = {
  let getRandomTheta = y => {
    let (_, pred) = LinAlg.Matrix.size(y)
    LinAlg.Matrix.make(Array.init(3, _ => Array.init(pred, _ => Random.float(400.))))
  }

  @react.component
  let make = (~x_m, ~y) => {
    let (theta, setTheta) = React.useState(() => getRandomTheta(y))
    React.useEffect1(() => {
      Js.Global.setTimeout(() => {
        let next = ML.LogReg.gradient_step(1., theta, x_m, y)
        setTheta(_ => next)
        ()
      }, 16)->ignore
      None
    }, [theta])
    <Fit x_m y theta />
  }
}

@react.component
let make = () => {
  let len = 800
  let clusters = 4

  let points = DataGen.Points.clusters(clusters, len)
  let (x_m, _) = LinAlg.Matrix.make(
    Array.init(len, ix => {
      let (x1, x2) = fst(points[ix])
      [1., x1, x2]
    }),
  )->ML.norm(_, ~ix=[1, 2], ())
  let y = LinAlg.Matrix.make(
    Array.init(len, row => Array.init(clusters, col => snd(points[row]) - col == 0 ? 1.0 : 0.0)),
  )
  <Train x_m y />
}
