module Matrix = {
  exception WrongDimensions((int, int), (int, int))
  type t = ((int, int), array<array<float>>)

  let make = (raw): t => ((Array.length(raw), Array.length(raw[0])), raw)

  let vector = (v: array<float>) => (
    (Array.length(v), 1),
    Array.init(Array.length(v), ix => [v[ix]]),
  )

  let raw_transform = %raw(`
    function (m, r, c) {
      let ans = Array(c).fill().map(() => Array(r).fill(0.0));
      for (let iy = 0; iy < c; iy++) {
        for (let ix = 0; ix < r; ix++) {
          ans[iy][ix] = m[ix][iy];
        }
      }
      return ans;
    }
  `)

  let transpose = (((r, c), m)) => ((c, r), raw_transform(m, r, c))

  let reduce_n = (fn, limit) => {
    let rec loop = (ix, sum) =>
      switch ix {
      | ix if ix == limit => sum
      | ix => loop(ix + 1, fn(sum, ix))
      }
    loop(0, 0.)
  }

  let dot = ((d_a, a): t, (d_b, b): t, fn): t =>
    fst(d_a) != fst(d_b)
      ? raise(WrongDimensions(d_a, d_b))
      : make(
          Array.init(fst(d_a), r => Array.init(snd(d_a), c => fn(a[r][c], b[r][mod(c, snd(d_b))]))),
        )

  let sum = (a, b) => dot(a, b, (a, b) => a +. b)
  let res = (a, b) => dot(a, b, (a, b) => a -. b)

  let raw_mult = %raw(`
    function (a, b, rx, ry, rp) {
      const ans = Array(rx).fill().map(() => Array(ry).fill(0.0));
      for (let ix = 0; ix < rx; ix++) {
        for (let iy = 0; iy < ry; iy++) {
          for (let ip = 0; ip < rp; ip++) {
            ans[ix][iy] += a[ix][ip] * b[ip][iy];
          }
        }
      }
      return ans;
    }
  `)

  let cross = ((d_a, a): t, (d_b, b): t): t =>
    snd(d_a) != fst(d_b)
      ? raise(WrongDimensions(d_a, d_b))
      : {
          let (pr, pc, pivot) = (fst(d_a), snd(d_b), snd(d_a))
          make(raw_mult(a, b, pr, pc, pivot))
        }

  let transform = ((d, m): t, fn): t => (
    d,
    Array.init(fst(d), r => Array.init(snd(d), c => fn(r, c, m[r][c]))),
  )

  let reduce = ((_, m): t, fn) =>
    Array.fold_left((sum, row) => Array.fold_left((sum, e) => fn(sum, e), sum, row), 0.0, m)

  let reduce_rows = (((dr, _), m): t): t => (
    (dr, 1),
    Array.init(dr, ix => [Array.fold_left((sum, e) => sum +. e, 0.0, m[ix])]),
  )

  let sum_c = (t, c) => transform(t, (_, _, e) => e +. c)
  let res_c = (t, c) => transform(t, (_, _, e) => e -. c)
  let mul_c = (t, c) => transform(t, (_, _, e) => e *. c)
  let div_c = (t, c) => transform(t, (_, _, e) => e /. c)
  let exp_c = (t, c) => transform(t, (_, _, e) => e ** c)
  let size = (t: t) => fst(t)

  let get = (r, c, (_, raw): t) => raw[r][c]
  let set = (r, c, v, (_, raw): t) => raw[r][c] = v

  let get_col = (ix_c, ((r, c), raw): t) =>
    if ix_c < 0 || ix_c >= c {
      raise(WrongDimensions((r, 1), (r, c)))
    } else {
      vector(Array.init(r, ix_r => raw[ix_r][ix_c]))
    }

  let add_col = (v, ((r, c), raw): t) => (
    (r, c + 1),
    Array.init(r, ir => Array.init(c + 1, ic => ic == 0 ? v : raw[ir][ic - 1])),
  )
  let raw_max_idx = %raw(`
    function (m, r, c) {
      const ans = Array(r);
      for (let ix = 0; ix < r; ix++) {
        let max_iy = 0;
        for (let iy = 1; iy < c; iy++) {
          if (m[ix][iy] > m[ix][max_iy]) {
            max_iy = iy;
          }
        }
        ans[ix] = [max_iy];
      }
      return ans;
    }
  `)
  let max_idx = (((r, c), raw): t): t => ((r, 1), raw_max_idx(raw, r, c))

  let raw_pct_eq = %raw(`
    function (a, b, r) {
      let pct = 0.0;
      for (let ix = 0; ix < r; ix++) {
        pct += (Math.abs(a[ix] - b[ix]) < 0.00000001) ? 1.0 : 0.0;
      }
      return pct / r;
    }
  `)

  let pct_eq = ((da, a): t, (db, b): t) =>
    if da != db {
      raise(WrongDimensions(da, db))
    } else {
      raw_pct_eq(a, b, fst(da))
    }
}
