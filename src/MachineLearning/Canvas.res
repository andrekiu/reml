let apply_changes = (canvasMaybe, fn) =>
  switch Js.Nullable.toOption(canvasMaybe) {
  | None => ()
  | Some(canvas) =>
    Webapi.Canvas.CanvasElement.getContext2d(canvas)->fn
    ()
  }

let scale = (points, dims) => {
  let dim_scale = (v, limit) => {
    let (low, high) = Array.fold_left(
      (sum, e) => (min(fst(sum), e), max(snd(sum), e)),
      (v[0], v[0]),
      v,
    )
    (e => (e -. low) *. limit /. (high -. low), (low, high))
  }
  let (gen_x, lim_x) = dim_scale(Array.map(e => fst(e), points), fst(dims)->float_of_int)
  let (gen_y, _) = dim_scale(Array.map(e => snd(e), points), snd(dims)->float_of_int)

  (p => (gen_x(fst(p)), snd(dims)->float_of_int -. gen_y(snd(p))), lim_x)
}

let useSyncCanvas = (fn, dims) => {
  let canvasRef = React.useRef(Js.Nullable.null)
  React.useEffect2(() => {
    let canvasMaybe = React.Ref.current(canvasRef)
    apply_changes(canvasMaybe, ctx => {
      Stylus.clear_canvas(ctx, dims)
      fn(ctx, scale)->ignore
    })
    None
  }, (canvasRef, fn))
  canvasRef
}

@react.component
let make = (~children, ~dims, ~onChange=(_: list<(float, float)>) => ()) => {
  let canvasRef = useSyncCanvas(children, dims)
  <canvas
    width={fst(dims)->string_of_int}
    height={snd(dims)->string_of_int}
    ref={canvasRef->ReactDOMRe.Ref.domRef}
  />
}

module Write = {
  type state = {
    presed: bool,
    pixels: list<(float, float)>,
  }

  type action =
    | MouseDown(ReactEvent.Mouse.t)
    | MouseUp(ReactEvent.Mouse.t)
    | MouseMove(ReactEvent.Mouse.t)
    | Clear

  let noop = (state, _) => state

  let getOffset = e => {
    let native = ReactEvent.Mouse.nativeEvent(e)
    let p = (float_of_int(native["offsetX"]), float_of_int(native["offsetY"]))
    let d = List.map(float_of_int, list{0, -1, 1, -2, 2})
    let append = (sum: list<(float, float)>, (x, y)) => list{(fst(p) +. x, snd(p) +. y), ...sum}
    List.fold_left(
      (sum, dx) => List.fold_left((sum, dy) => append(sum, (dx, dy)), sum, d),
      list{},
      d,
    )
  }
  let reducer = (state: state, action: action): state =>
    switch action {
    | MouseDown(e) => {presed: true, pixels: \"@"(getOffset(e), state.pixels)}
    | MouseMove(e) =>
      state.presed ? {presed: true, pixels: \"@"(getOffset(e), state.pixels)} : state
    | MouseUp(_) => {presed: false, pixels: state.pixels}
    | Clear => {presed: false, pixels: list{}}
    }

  let persistEventAnd = (e, fn) => {
    ReactEvent.Mouse.persist(e)
    fn(e)
  }
  @react.component
  let make = (~dims, ~onChange=(_: list<(float, float)>) => ()) => {
    let (state, dispatch) = React.useReducer(reducer, {presed: false, pixels: list{}})
    let canvasRef = useSyncCanvas(
      (ctx, _) => List.iter(p => Stylus.draw_square(ctx, p, 100. /. 28., ()), state.pixels),
      dims,
    )

    React.useEffect1(() => {
      let token = Js.Global.setTimeout(() => onChange(state.pixels), 300)
      Some(() => Js.Global.clearTimeout(token))
    }, [state.pixels])

    <div>
      <canvas
        width={fst(dims)->string_of_int}
        height={snd(dims)->string_of_int}
        ref={canvasRef->ReactDOMRe.Ref.domRef}
        onMouseDown={e => persistEventAnd(e, e => dispatch(MouseDown(e)))}
        onMouseMove={e => persistEventAnd(e, e => dispatch(MouseMove(e)))}
        onMouseUp={e => persistEventAnd(e, e => dispatch(MouseUp(e)))}
        onMouseLeave={e => persistEventAnd(e, e => dispatch(MouseUp(e)))}
      />
      <button onClick={_ => dispatch(Clear)}> {React.string("Clear")} </button>
    </div>
  }
}
