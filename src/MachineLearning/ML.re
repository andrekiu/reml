open LinAlg;

let norm = (x: Matrix.t, ~ix: array(int)=[||], ()) => {
  let aggregate = ((low, high, sum), e) => (
    min(low, e),
    max(high, e),
    sum +. e,
  );
  let reduce = (fn, e, m) => {
    let rec loop = (ix, sum) =>
      switch (ix) {
      | ix when ix == m => sum
      | ix => loop(ix + 1, fn(sum, ix))
      };
    loop(0, e);
  };

  let iter = (fn, m) => {
    let rec loop = ix =>
      switch (ix) {
      | ix when ix == m => ()
      | ix =>
        fn(ix);
        loop(ix + 1);
      };
    loop(0);
  };

  let normalize_dim = (col: int, ans) => {
    let (m, _) = Matrix.size(ans);
    let first = Matrix.get(0, col, ans);
    let (low, high, sum) =
      reduce(
        (sum, row) => aggregate(sum, Matrix.get(row, col, ans)),
        (first, first, 0.0),
        m,
      );
    let mean = sum /. float_of_int(m);
    let range = high -. low +. 0.000000000001;
    ans => {
      let (m, _) = Matrix.size(ans);
      iter(
        ix =>
          Matrix.set(
            ix,
            col,
            (Matrix.get(ix, col, ans) -. mean) /. range,
            ans,
          ),
        m,
      );
    };
  };

  let ans = Matrix.make(snd(x));
  let (_, c) = Matrix.size(ans);
  let massage =
    Array.map(
      row_ix => {
        let massager = normalize_dim(row_ix, ans);
        massager(ans);
        massager;
      },
      Array.length(ix) == 0 ? Array.init(c, ic => ic) : ix,
    );
  (
    ans,
    sample => {
      let ans = Matrix.make(snd(sample));
      Array.iter(m => m(ans), massage);
      ans;
    },
  );
};

let normalize = (points: array((float, float))) => {
  let aggregate = ((low, high, sum), e) => (
    min(low, e),
    max(high, e),
    sum +. e,
  );
  let (x, y) = points[0];
  let (tx, _) =
    Array.fold_left(
      ((sumx, sumy), (x, y)) => {
        (aggregate(sumx, x), aggregate(sumy, y))
      },
      ((x, x, 0.), (y, y, 0.)),
      points,
    );
  let get_u = ((_, _, sum)) => sum /. float_of_int(Array.length(points));
  let get_d = ((l, h, _)) => h -. l;
  let transform = (t, p) => {
    (p -. get_u(t)) /. get_d(t);
  };

  let normalized = Array.map(((x, y)) => (transform(tx, x), y), points);

  let x_m =
    Matrix.make(
      Array.init(Array.length(normalized), r =>
        Array.init(2, c => c == 0 ? 1. : normalized[r]->fst)
      ),
    );
  let y = Matrix.vector(Array.map(s => snd(s), normalized));
  (x_m, y);
};

module LinReg = {
  let gradient_step = (alpha, theta, x_m, y) => {
    let (m, _) = Matrix.size(x_m);
    Matrix.res(
      theta,
      Matrix.transpose(x_m)
      ->Matrix.cross(_, Matrix.res(Matrix.cross(x_m, theta), y))
      ->Matrix.mul_c(_, alpha /. float_of_int(m)),
    );
  };

  let cost = (theta, x_m, y) => {
    let pred = Matrix.cross(x_m, theta);
    let residual = Matrix.res(pred, y);
    let (m, _) = Matrix.size(x_m);
    Matrix.reduce(residual, (sum, e) =>
      e ** 2.0 /. (2.0 *. float_of_int(m)) +. sum
    );
  };
};

module LogReg = {
  let sigmoid = z => 1. /. (1. +. exp(-. z));
  let gradient_step = (alpha, theta, x_m, y) => {
    let linear = Matrix.cross(x_m, theta);
    let h = Matrix.transform(linear, (_, _, e) => sigmoid(e));
    let error = Matrix.res(h, y);
    let (m, _) = Matrix.size(x_m);
    let residual = Matrix.cross(Matrix.transpose(x_m), error);
    let scale = Matrix.mul_c(residual, alpha /. float_of_int(m));
    Matrix.res(theta, scale)
    ->Matrix.res(
        _,
        Matrix.transform(theta, (r, _, e) =>
          r == 0 ? e /. float_of_int(m) : e *. 1. /. float_of_int(m)
        ),
      );
  };

  let cost = (theta, x_m, y) => {
    let eps = 0.00000000000001;
    let (m, _) = Matrix.size(x_m);
    let h = Matrix.cross(x_m, theta);
    let pred = Matrix.transform(h, (_, _, e) => sigmoid(e));
    let pos =
      Matrix.dot(
        y, Matrix.transform(pred, (_, _, e) => log(e +. eps)), (a, b) =>
        a *. b /. float_of_int(m)
      );
    let neg =
      Matrix.dot(
        y, Matrix.transform(pred, (_, _, e) => log(1. -. e +. eps)), (a, b) =>
        (1. -. a) *. b /. float_of_int(m)
      );
    Matrix.(
      dot(pos, neg, (a, b) => -. a -. b)->transpose->reduce_rows->transpose
    );
  };
};

module NIST = {
  let accuracy = (theta, x_m, y) => {
    let linear = Matrix.cross(x_m, theta);
    let h = Matrix.max_idx(linear);
    Matrix.pct_eq(Matrix.max_idx(y), h);
  };

  let predict = (theta, sample): LinAlg.Matrix.t => {
    Js.log2(theta, sample);
    switch (Matrix.cross(sample, theta)) {
    | exception (LinAlg.Matrix.WrongDimensions(_, _)) =>
      LinAlg.Matrix.make([|Array.init(10, _ => 0.0)|])
    | linear => Matrix.transform(linear, (_, _, e) => LogReg.sigmoid(e))
    };
  };
};