'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var WrongDimensions = Caml_exceptions.create("LinAlg-ReasonReactExamples.Matrix.WrongDimensions");

function make(raw) {
  return /* tuple */[
          /* tuple */[
            raw.length,
            Caml_array.caml_array_get(raw, 0).length
          ],
          raw
        ];
}

function vector(v) {
  return /* tuple */[
          /* tuple */[
            v.length,
            1
          ],
          $$Array.init(v.length, (function (ix) {
                  return /* array */[Caml_array.caml_array_get(v, ix)];
                }))
        ];
}

var raw_transform = (
    function (m, r, c) {
      let ans = Array(c).fill().map(() => Array(r).fill(0.0));
      for (let iy = 0; iy < c; iy++) {
        for (let ix = 0; ix < r; ix++) {
          ans[iy][ix] = m[ix][iy];
        }
      }
      return ans;
    }
  );

function transpose(param) {
  var match = param[0];
  var c = match[1];
  var r = match[0];
  return /* tuple */[
          /* tuple */[
            c,
            r
          ],
          Curry._3(raw_transform, param[1], r, c)
        ];
}

function reduce_n(fn, limit) {
  var _ix = 0;
  var _sum = 0;
  while(true) {
    var sum = _sum;
    var ix = _ix;
    if (ix === limit) {
      return sum;
    } else {
      _sum = Curry._2(fn, sum, ix);
      _ix = ix + 1 | 0;
      continue ;
    }
  };
}

function dot(param, param$1, fn) {
  var b = param$1[1];
  var d_b = param$1[0];
  var a = param[1];
  var d_a = param[0];
  var match = d_a[0] !== d_b[0];
  if (match) {
    throw [
          WrongDimensions,
          d_a,
          d_b
        ];
  }
  return make($$Array.init(d_a[0], (function (r) {
                    return $$Array.init(d_a[1], (function (c) {
                                  return Curry._2(fn, Caml_array.caml_array_get(Caml_array.caml_array_get(a, r), c), Caml_array.caml_array_get(Caml_array.caml_array_get(b, r), Caml_int32.mod_(c, d_b[1])));
                                }));
                  })));
}

function sum(a, b) {
  return dot(a, b, (function (a, b) {
                return a + b;
              }));
}

function res(a, b) {
  return dot(a, b, (function (a, b) {
                return a - b;
              }));
}

var raw_mult = (
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
  );

function cross(param, param$1) {
  var d_b = param$1[0];
  var d_a = param[0];
  var match = d_a[1] !== d_b[0];
  if (match) {
    throw [
          WrongDimensions,
          d_a,
          d_b
        ];
  }
  var pr = d_a[0];
  var pc = d_b[1];
  var pivot = d_a[1];
  return make(Curry._5(raw_mult, param[1], param$1[1], pr, pc, pivot));
}

function transform(param, fn) {
  var m = param[1];
  var d = param[0];
  return /* tuple */[
          d,
          $$Array.init(d[0], (function (r) {
                  return $$Array.init(d[1], (function (c) {
                                return Curry._3(fn, r, c, Caml_array.caml_array_get(Caml_array.caml_array_get(m, r), c));
                              }));
                }))
        ];
}

function reduce(param, fn) {
  return $$Array.fold_left((function (sum, row) {
                return $$Array.fold_left(Curry.__2(fn), sum, row);
              }), 0.0, param[1]);
}

function reduce_rows(param) {
  var m = param[1];
  var dr = param[0][0];
  return /* tuple */[
          /* tuple */[
            dr,
            1
          ],
          $$Array.init(dr, (function (ix) {
                  return /* array */[$$Array.fold_left((function (sum, e) {
                                  return sum + e;
                                }), 0.0, Caml_array.caml_array_get(m, ix))];
                }))
        ];
}

function sum_c(t, c) {
  return transform(t, (function (param, param$1, e) {
                return e + c;
              }));
}

function res_c(t, c) {
  return transform(t, (function (param, param$1, e) {
                return e - c;
              }));
}

function mul_c(t, c) {
  return transform(t, (function (param, param$1, e) {
                return e * c;
              }));
}

function div_c(t, c) {
  return transform(t, (function (param, param$1, e) {
                return e / c;
              }));
}

function exp_c(t, c) {
  return transform(t, (function (param, param$1, e) {
                return Math.pow(e, c);
              }));
}

function size(t) {
  return t[0];
}

function get(r, c, param) {
  return Caml_array.caml_array_get(Caml_array.caml_array_get(param[1], r), c);
}

function set(r, c, v, param) {
  return Caml_array.caml_array_set(Caml_array.caml_array_get(param[1], r), c, v);
}

function get_col(ix_c, param) {
  var match = param[0];
  var c = match[1];
  var r = match[0];
  if (ix_c < 0 || ix_c >= c) {
    throw [
          WrongDimensions,
          /* tuple */[
            r,
            1
          ],
          /* tuple */[
            r,
            c
          ]
        ];
  }
  var raw = param[1];
  return vector($$Array.init(r, (function (ix_r) {
                    return Caml_array.caml_array_get(Caml_array.caml_array_get(raw, ix_r), ix_c);
                  })));
}

function add_col(v, param) {
  var raw = param[1];
  var match = param[0];
  var c = match[1];
  var r = match[0];
  return /* tuple */[
          /* tuple */[
            r,
            c + 1 | 0
          ],
          $$Array.init(r, (function (ir) {
                  return $$Array.init(c + 1 | 0, (function (ic) {
                                var match = ic === 0;
                                if (match) {
                                  return v;
                                } else {
                                  return Caml_array.caml_array_get(Caml_array.caml_array_get(raw, ir), ic - 1 | 0);
                                }
                              }));
                }))
        ];
}

var raw_max_idx = (
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
  );

function max_idx(param) {
  var match = param[0];
  var r = match[0];
  return /* tuple */[
          /* tuple */[
            r,
            1
          ],
          Curry._3(raw_max_idx, param[1], r, match[1])
        ];
}

var raw_pct_eq = (
    function (a, b, r) {
      let pct = 0.0;
      for (let ix = 0; ix < r; ix++) {
        pct += (Math.abs(a[ix] - b[ix]) < 0.00000001) ? 1.0 : 0.0;
      }
      return pct / r;
    }
  );

function pct_eq(param, param$1) {
  var db = param$1[0];
  var da = param[0];
  if (Caml_obj.caml_notequal(da, db)) {
    throw [
          WrongDimensions,
          da,
          db
        ];
  }
  return Curry._3(raw_pct_eq, param[1], param$1[1], da[0]);
}

var Matrix = {
  WrongDimensions: WrongDimensions,
  make: make,
  vector: vector,
  raw_transform: raw_transform,
  transpose: transpose,
  reduce_n: reduce_n,
  dot: dot,
  sum: sum,
  res: res,
  raw_mult: raw_mult,
  cross: cross,
  transform: transform,
  reduce: reduce,
  reduce_rows: reduce_rows,
  sum_c: sum_c,
  res_c: res_c,
  mul_c: mul_c,
  div_c: div_c,
  exp_c: exp_c,
  size: size,
  get: get,
  set: set,
  get_col: get_col,
  add_col: add_col,
  raw_max_idx: raw_max_idx,
  max_idx: max_idx,
  raw_pct_eq: raw_pct_eq,
  pct_eq: pct_eq
};

exports.Matrix = Matrix;
/* raw_transform Not a pure module */
