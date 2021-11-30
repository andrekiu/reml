module HypothesisFit = {
  @react.component
  let make = (~x_m, ~y, ~theta) => {
    open LinAlg
    let points = React.useMemo(() =>
      Array.init(Matrix.size(x_m)->fst, ix => (Matrix.get(ix, 1, x_m), Matrix.get(ix, 0, y)))
    )
    let dims = (400, 400)
    <Canvas dims>
      {(ctx, scale) => {
        let h = x => Matrix.get(0, 0, theta) +. x *. Matrix.get(1, 0, theta)
        let (_, (low, high)) = scale(points, dims)
        let get_bounds = x => (x, h(x))
        let extremes = list{get_bounds(low), get_bounds(high)}
        let re = scale(Array.append(Array.of_list(extremes), points), dims)
        let t = fst(re)
        Array.iter(e => Stylus.draw_point(ctx, t(e), ()), points)
        Stylus.draw_line(ctx, List.map(t, extremes), ())
      }}
    </Canvas>
  }
}

module CostCovergence = {
  @react.component
  let make = (~hist_theta) => {
    let idx = l => float_of_int(List.length(hist_theta) - List.length(l))
    let points = List.fold_left(
      (sum, (_, cost)) => list{(idx(sum), cost), ...sum},
      list{},
      hist_theta,
    )
    let dims = (280, 200)
    <Canvas dims>
      {(ctx, scale) => {
        let (t_canvas, _) = scale(points->Array.of_list, dims)
        Stylus.draw_line(ctx, List.map(t_canvas, points), ())
      }}
    </Canvas>
  }
}

module TimeTravel = {
  @react.component
  let make = (~hist_theta, ~onSelect) => {
    let iters = string_of_int(List.length(hist_theta))
    <div>
      <div> {React.string(j`Converged in $iters steps.`)} </div>
      <div
        style={ReactDOMRe.Style.make(
          ~display="flex",
          ~maxWidth="280px",
          ~minHeight="50px",
          ~overflowY="scroll",
          ~overflowX="visible",
          (),
        )}>
        {React.array(
          List.mapi(
            (ix, (t, cost)) =>
              <span
                onClick={_ => onSelect((ix, t))}
                key={Js.Int.toString(ix)}
                style={ReactDOMRe.Style.make(
                  ~border="solid 1px",
                  ~padding="3px",
                  ~margin="10px",
                  (),
                )}>
                {React.string(Js.Float.toFixedWithPrecision(cost, ~digits=5))}
              </span>,
            hist_theta,
          )
          ->List.rev
          ->Array.of_list,
        )}
      </div>
    </div>
  }
}

module FitPoly = {
  open LinAlg
  let is_stable = (hist): bool =>
    List.length(hist) > 200 ||
      switch hist {
      | list{a, b, ..._} => abs_float(snd(a) -. snd(b)) < 0.00001
      | _ => false
      }

  type state = {
    hist_theta: list<(LinAlg.Matrix.t, float)>,
    selection: option<(int, LinAlg.Matrix.t)>,
    alpha: float,
  }

  let get_theta = state =>
    switch state.selection {
    | None => List.hd(state.hist_theta)->fst
    | Some((_, theta)) => theta
    }

  let get_initial_state = (x_m, y): state => {
    let theta = LinAlg.Matrix.vector([Random.float(400.), Random.float(400.)])
    {
      hist_theta: list{(theta, ML.LinReg.cost(theta, x_m, y))},
      selection: None,
      alpha: 2.,
    }
  }

  @react.component
  let make = (~x_m, ~y, ~onRestart) => {
    let (state, setState) = React.useState(() => get_initial_state(x_m, y))
    React.useEffect1(() => {
      !is_stable(state.hist_theta) ? Js.Global.setTimeout(() =>
            setState(s => {
              let prev = List.hd(s.hist_theta)->fst
              let next = ML.LinReg.gradient_step(s.alpha, prev, x_m, y)
              {
                ...s,
                hist_theta: list{(next, ML.LinReg.cost(next, x_m, y)), ...s.hist_theta},
              }
            })
          , 16)->ignore : ()
      None
    }, [state])
    <div style={ReactDOMRe.Style.make(~display="flex", ~justifyContent="space-evenly", ())}>
      <HypothesisFit x_m y theta={get_theta(state)} />
      <div
        style={ReactDOMRe.Style.make(
          ~display="flex",
          ~flexDirection="column",
          ~justifyContent="space-evenly",
          ~alignItems="center",
          (),
        )}>
        <button
          onClick={_ => {
            setState(s => {...get_initial_state(x_m, y), alpha: s.alpha})
            onRestart()
          }}>
          {React.string("Restart")}
        </button>
        <span>
          <label> {React.string("Prediction = ")} </label>
          {
            let theta = get_theta(state)
            let (m0, m1) = (LinAlg.Matrix.get(0, 0, theta), LinAlg.Matrix.get(1, 0, theta))
            let sign = m1 < 0.0 ? "-" : "+"
            let str_m0 = Js.Float.toFixedWithPrecision(m0, ~digits=2)
            let abs_m1 = abs_float(m1)->Js.Float.toFixedWithPrecision(_, ~digits=2)
            React.string(j`$str_m0 $sign x * $abs_m1`)
          }
        </span>
        <span>
          <label> {React.string("Alpha = ")} </label>
          <input
            defaultValue={Js.Float.toString(state.alpha)}
            onBlur={e => {
              let value = ReactEvent.Focus.target(e)["value"]
              Js.log(value)
              switch float_of_string(value) {
              | exception Failure(_) => ()
              | t => setState(s => {...s, alpha: t})
              }
            }}
          />
        </span>
        <TimeTravel
          hist_theta=state.hist_theta
          onSelect={selection => setState(s => {...s, selection: Some(selection)})}
        />
        <CostCovergence
          hist_theta={switch state.selection {
          | None => state.hist_theta
          | Some((ix, _)) =>
            Belt.List.take(List.rev(state.hist_theta), List.length(state.hist_theta) - ix)
            ->Belt.Option.getExn
            ->List.rev
          }}
        />
      </div>
    </div>
  }
}

@react.component
let make = () => {
  let (data, setData) = React.useState(() => DataGen.Points.gen(500))
  let (x_m, y) = ML.normalize(data)
  <FitPoly x_m y onRestart={_ => setData(_ => DataGen.Points.gen(500))} />
}
