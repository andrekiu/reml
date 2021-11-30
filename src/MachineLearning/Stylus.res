let draw_point = (ctx, (x, y), ~color="black", ()) => {
  open Webapi.Canvas.Canvas2d
  beginPath(ctx)
  arc(ctx, ~x, ~y, ~r=1.0, ~startAngle=0.0, ~endAngle=Pervasives.acos(-1.) *. 2., ~anticw=false)
  setFillStyle(ctx, String, color)
  fill(ctx)
}

let clear_canvas = (ctx, (w, h)) => {
  open Webapi.Canvas.Canvas2d
  clearRect(ctx, ~x=0., ~y=0., ~w=float_of_int(w), ~h=float_of_int(h))
}

let draw_line = (ctx, pts, ~color="red", ()) => {
  open Webapi.Canvas
  let rec loop = pts =>
    switch pts {
    | list{f, s, ...t} =>
      Canvas2d.moveTo(ctx, ~x=fst(f), ~y=snd(f))
      Canvas2d.lineTo(ctx, ~x=fst(s), ~y=snd(s))
      loop(list{s, ...t})
    | _ => ignore()
    }
  Canvas2d.setStrokeStyle(ctx, Canvas2d.String, color)
  Canvas2d.lineWidth(ctx, 1.)
  Canvas2d.beginPath(ctx)
  loop(pts)
  Canvas2d.stroke(ctx)
}

let draw_square = (ctx, p, side, density) => {
  open Webapi.Canvas
  let color = j`rgb($density, $density, $density)`
  Canvas2d.setFillStyle(ctx, Canvas2d.String, color)
  Canvas2d.fillRect(~x=fst(p), ~y=snd(p), ~w=side, ~h=side, ctx)
}
