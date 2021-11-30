'use strict';

var Caml = require("rescript/lib/js/caml.js");
var $$Array = require("rescript/lib/js/array.js");
var Curry = require("rescript/lib/js/curry.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");
var LinAlg$ReasonReactExamples = require("./LinAlg.bs.js");

function norm(x, ixOpt, param) {
  var ix = ixOpt !== undefined ? ixOpt : [];
  var reduce = function (fn, e, m) {
    var _ix = 0;
    var _sum = e;
    while(true) {
      var sum = _sum;
      var ix = _ix;
      if (ix === m) {
        return sum;
      }
      _sum = Curry._2(fn, sum, ix);
      _ix = ix + 1 | 0;
      continue ;
    };
  };
  var normalize_dim = function (col, ans) {
    var match = LinAlg$ReasonReactExamples.Matrix.size(ans);
    var m = match[0];
    var first = LinAlg$ReasonReactExamples.Matrix.get(0, col, ans);
    var match$1 = reduce((function (sum, row) {
            var e = LinAlg$ReasonReactExamples.Matrix.get(row, col, ans);
            return [
                    Caml.caml_float_min(sum[0], e),
                    Caml.caml_float_max(sum[1], e),
                    sum[2] + e
                  ];
          }), [
          first,
          first,
          0.0
        ], m);
    var mean = match$1[2] / m;
    var range = match$1[1] - match$1[0] + 0.000000000001;
    return function (ans) {
      var match = LinAlg$ReasonReactExamples.Matrix.size(ans);
      var fn = function (ix) {
        return LinAlg$ReasonReactExamples.Matrix.set(ix, col, (LinAlg$ReasonReactExamples.Matrix.get(ix, col, ans) - mean) / range, ans);
      };
      var m = match[0];
      var _ix = 0;
      while(true) {
        var ix = _ix;
        if (ix === m) {
          return ;
        }
        Curry._1(fn, ix);
        _ix = ix + 1 | 0;
        continue ;
      };
    };
  };
  var ans = LinAlg$ReasonReactExamples.Matrix.make(x[1]);
  var match = LinAlg$ReasonReactExamples.Matrix.size(ans);
  var massage = $$Array.map((function (row_ix) {
          var massager = normalize_dim(row_ix, ans);
          Curry._1(massager, ans);
          return massager;
        }), ix.length === 0 ? $$Array.init(match[1], (function (ic) {
                return ic;
              })) : ix);
  return [
          ans,
          (function (sample) {
              var ans = LinAlg$ReasonReactExamples.Matrix.make(sample[1]);
              $$Array.iter((function (m) {
                      return Curry._1(m, ans);
                    }), massage);
              return ans;
            })
        ];
}

function normalize(points) {
  var aggregate = function (param, e) {
    return [
            Caml.caml_float_min(param[0], e),
            Caml.caml_float_max(param[1], e),
            param[2] + e
          ];
  };
  var match = Caml_array.get(points, 0);
  var y = match[1];
  var x = match[0];
  var match$1 = $$Array.fold_left((function (param, param$1) {
          return [
                  aggregate(param[0], param$1[0]),
                  aggregate(param[1], param$1[1])
                ];
        }), [
        [
          x,
          x,
          0
        ],
        [
          y,
          y,
          0
        ]
      ], points);
  var tx = match$1[0];
  var get_u = function (param) {
    return param[2] / points.length;
  };
  var get_d = function (param) {
    return param[1] - param[0];
  };
  var transform = function (t, p) {
    return (p - get_u(t)) / get_d(t);
  };
  var normalized = $$Array.map((function (param) {
          return [
                  transform(tx, param[0]),
                  param[1]
                ];
        }), points);
  var x_m = LinAlg$ReasonReactExamples.Matrix.make($$Array.init(normalized.length, (function (r) {
              return $$Array.init(2, (function (c) {
                            if (c === 0) {
                              return 1;
                            } else {
                              return Caml_array.get(normalized, r)[0];
                            }
                          }));
            })));
  var y$1 = LinAlg$ReasonReactExamples.Matrix.vector($$Array.map((function (s) {
              return s[1];
            }), normalized));
  return [
          x_m,
          y$1
        ];
}

function gradient_step(alpha, theta, x_m, y) {
  var match = LinAlg$ReasonReactExamples.Matrix.size(x_m);
  var __x = LinAlg$ReasonReactExamples.Matrix.transpose(x_m);
  var __x$1 = LinAlg$ReasonReactExamples.Matrix.cross(__x, LinAlg$ReasonReactExamples.Matrix.res(LinAlg$ReasonReactExamples.Matrix.cross(x_m, theta), y));
  return LinAlg$ReasonReactExamples.Matrix.res(theta, LinAlg$ReasonReactExamples.Matrix.mul_c(__x$1, alpha / match[0]));
}

function cost(theta, x_m, y) {
  var pred = LinAlg$ReasonReactExamples.Matrix.cross(x_m, theta);
  var residual = LinAlg$ReasonReactExamples.Matrix.res(pred, y);
  var match = LinAlg$ReasonReactExamples.Matrix.size(x_m);
  var m = match[0];
  return LinAlg$ReasonReactExamples.Matrix.reduce(residual, (function (sum, e) {
                return Math.pow(e, 2.0) / (2.0 * m) + sum;
              }));
}

var LinReg = {
  gradient_step: gradient_step,
  cost: cost
};

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

function gradient_step$1(alpha, theta, x_m, y) {
  var linear = LinAlg$ReasonReactExamples.Matrix.cross(x_m, theta);
  var h = LinAlg$ReasonReactExamples.Matrix.transform(linear, (function (param, param$1, e) {
          return sigmoid(e);
        }));
  var error = LinAlg$ReasonReactExamples.Matrix.res(h, y);
  var match = LinAlg$ReasonReactExamples.Matrix.size(x_m);
  var m = match[0];
  var residual = LinAlg$ReasonReactExamples.Matrix.cross(LinAlg$ReasonReactExamples.Matrix.transpose(x_m), error);
  var scale = LinAlg$ReasonReactExamples.Matrix.mul_c(residual, alpha / m);
  var __x = LinAlg$ReasonReactExamples.Matrix.res(theta, scale);
  return LinAlg$ReasonReactExamples.Matrix.res(__x, LinAlg$ReasonReactExamples.Matrix.transform(theta, (function (r, param, e) {
                    if (r === 0) {
                      return e / m;
                    } else {
                      return e * 1 / m;
                    }
                  })));
}

function cost$1(theta, x_m, y) {
  var match = LinAlg$ReasonReactExamples.Matrix.size(x_m);
  var m = match[0];
  var h = LinAlg$ReasonReactExamples.Matrix.cross(x_m, theta);
  var pred = LinAlg$ReasonReactExamples.Matrix.transform(h, (function (param, param$1, e) {
          return sigmoid(e);
        }));
  var pos = LinAlg$ReasonReactExamples.Matrix.dot(y, LinAlg$ReasonReactExamples.Matrix.transform(pred, (function (param, param$1, e) {
              return Math.log(e + 0.00000000000001);
            })), (function (a, b) {
          return a * b / m;
        }));
  var neg = LinAlg$ReasonReactExamples.Matrix.dot(y, LinAlg$ReasonReactExamples.Matrix.transform(pred, (function (param, param$1, e) {
              return Math.log(1 - e + 0.00000000000001);
            })), (function (a, b) {
          return (1 - a) * b / m;
        }));
  return LinAlg$ReasonReactExamples.Matrix.transpose(LinAlg$ReasonReactExamples.Matrix.reduce_rows(LinAlg$ReasonReactExamples.Matrix.transpose(LinAlg$ReasonReactExamples.Matrix.dot(pos, neg, (function (a, b) {
                            return -a - b;
                          })))));
}

var LogReg = {
  sigmoid: sigmoid,
  gradient_step: gradient_step$1,
  cost: cost$1
};

function accuracy(theta, x_m, y) {
  var linear = LinAlg$ReasonReactExamples.Matrix.cross(x_m, theta);
  var h = LinAlg$ReasonReactExamples.Matrix.max_idx(linear);
  return LinAlg$ReasonReactExamples.Matrix.pct_eq(LinAlg$ReasonReactExamples.Matrix.max_idx(y), h);
}

function predict(theta, sample) {
  console.log(theta, sample);
  var linear;
  try {
    linear = LinAlg$ReasonReactExamples.Matrix.cross(sample, theta);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === LinAlg$ReasonReactExamples.Matrix.WrongDimensions) {
      return LinAlg$ReasonReactExamples.Matrix.make([$$Array.init(10, (function (param) {
                          return 0.0;
                        }))]);
    }
    throw exn;
  }
  return LinAlg$ReasonReactExamples.Matrix.transform(linear, (function (param, param$1, e) {
                return sigmoid(e);
              }));
}

var NIST = {
  accuracy: accuracy,
  predict: predict
};

exports.norm = norm;
exports.normalize = normalize;
exports.LinReg = LinReg;
exports.LogReg = LogReg;
exports.NIST = NIST;
/* No side effect */
