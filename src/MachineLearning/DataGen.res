module Points = {
  let gen = len => {
    Random.init(Js.Date.now()->int_of_float)
    let slope = Random.float(4.)
    let shift = Random.float(20.) -. 10.
    Array.init(len, _ => {
      let shift_error = Random.float(40.)
      let slope_error = Random.float(slope /. 2.) -. slope /. 4.
      let x = Random.float(400.0)
      (x, shift +. shift_error +. (slope +. slope_error) *. (Random.float(400.) -. x))
    })
  }

  let clusters = (n, len) => {
    Random.init(Js.Date.now()->int_of_float)
    let p = 1. /. float_of_int(n)
    let circles = Array.init(n, _ => (
      Random.float(400.),
      Random.float(400.),
      50.0 +. Random.float(20.),
    ))

    Array.init(len, _ => {
      let cluster = int_of_float(Random.float(1.) /. p)
      let (cx, cy, max_r) = circles[cluster]
      let angle = 2.0 *. Random.float(acos(-1.))
      let r = Random.float(max_r)
      let (x, y) = (cos(angle) *. r, sin(angle) *. r)
      ((cx +. x, cy +. y), cluster)
    })
  }
}
