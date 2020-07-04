'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Random = require("bs-platform/lib/js/random.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var ML$ReasonReactExamples = require("../ML.bs.js");
var Canvas$ReasonReactExamples = require("../Canvas.bs.js");
var LinAlg$ReasonReactExamples = require("../LinAlg.bs.js");
var Stylus$ReasonReactExamples = require("../Stylus.bs.js");
var DataGen$ReasonReactExamples = require("../DataGen.bs.js");

function forn(n, fn) {
  var _ix = 0;
  while(true) {
    var ix = _ix;
    if (ix === n) {
      return /* () */0;
    } else {
      Curry._1(fn, ix);
      _ix = ix + 1 | 0;
      continue ;
    }
  };
}

function near_boundary(x1, theta) {
  var residual = LinAlg$ReasonReactExamples.Matrix.get(0, 0, theta) + LinAlg$ReasonReactExamples.Matrix.get(1, 0, theta) * x1;
  return -residual / LinAlg$ReasonReactExamples.Matrix.get(2, 0, theta);
}

function get_color(n, y) {
  var match = LinAlg$ReasonReactExamples.Matrix.size(y);
  var cols = match[1];
  var _ix = 0;
  while(true) {
    var ix = _ix;
    if (ix === cols) {
      return -1;
    } else {
      var match$1 = (LinAlg$ReasonReactExamples.Matrix.get(n, ix, y) | 0) === 1;
      if (match$1) {
        return ix;
      } else {
        _ix = ix + 1 | 0;
        continue ;
      }
    }
  };
}

function LogisticRegression$Fit(Props) {
  var x_m = Props.x_m;
  var y = Props.y;
  var theta = Props.theta;
  var dims = /* tuple */[
    400,
    400
  ];
  var pallete = /* array */[
    "green",
    "blue",
    "red",
    "black",
    "purple",
    "gray"
  ];
  return React.createElement(Canvas$ReasonReactExamples.make, {
              children: (function (ctx, scale) {
                  var match = LinAlg$ReasonReactExamples.Matrix.size(x_m);
                  var points = $$Array.init(match[0], (function (ix) {
                          return /* tuple */[
                                  /* tuple */[
                                    LinAlg$ReasonReactExamples.Matrix.get(ix, 1, x_m),
                                    LinAlg$ReasonReactExamples.Matrix.get(ix, 2, x_m)
                                  ],
                                  get_color(ix, y)
                                ];
                        }));
                  var match$1 = Curry._2(scale, $$Array.map((function (prim) {
                              return prim[0];
                            }), points), dims);
                  var match$2 = match$1[1];
                  var high = match$2[1];
                  var low = match$2[0];
                  var t = match$1[0];
                  $$Array.iter((function (p) {
                          return Stylus$ReasonReactExamples.draw_point(ctx, Curry._1(t, p[0]), Caml_array.caml_array_get(pallete, p[1]), /* () */0);
                        }), points);
                  var match$3 = LinAlg$ReasonReactExamples.Matrix.size(theta);
                  return forn(match$3[1], (function (ix) {
                                var line = List.map((function (e) {
                                        return Curry._1(t, /* tuple */[
                                                    e,
                                                    near_boundary(e, LinAlg$ReasonReactExamples.Matrix.get_col(ix, theta))
                                                  ]);
                                      }), /* :: */[
                                      low,
                                      /* :: */[
                                        high,
                                        /* [] */0
                                      ]
                                    ]);
                                return Stylus$ReasonReactExamples.draw_line(ctx, line, Caml_array.caml_array_get(pallete, ix), /* () */0);
                              }));
                }),
              dims: dims
            });
}

var Fit = {
  forn: forn,
  near_boundary: near_boundary,
  get_color: get_color,
  make: LogisticRegression$Fit
};

function getRandomTheta(y) {
  var match = LinAlg$ReasonReactExamples.Matrix.size(y);
  var pred = match[1];
  return LinAlg$ReasonReactExamples.Matrix.make($$Array.init(3, (function (param) {
                    return $$Array.init(pred, (function (param) {
                                  return Random.$$float(400);
                                }));
                  })));
}

function LogisticRegression$Train(Props) {
  var x_m = Props.x_m;
  var y = Props.y;
  var match = React.useState((function () {
          return getRandomTheta(y);
        }));
  var setTheta = match[1];
  var theta = match[0];
  React.useEffect((function () {
          setTimeout((function (param) {
                  var next = ML$ReasonReactExamples.LogReg.gradient_step(20, theta, x_m, y);
                  Curry._1(setTheta, (function (param) {
                          return next;
                        }));
                  return /* () */0;
                }), 16);
          return ;
        }), /* array */[theta]);
  return React.createElement(LogisticRegression$Fit, {
              x_m: x_m,
              y: y,
              theta: theta
            });
}

var Train = {
  getRandomTheta: getRandomTheta,
  make: LogisticRegression$Train
};

function LogisticRegression(Props) {
  var points = DataGen$ReasonReactExamples.Points.clusters(6, 800);
  var __x = LinAlg$ReasonReactExamples.Matrix.make($$Array.init(800, (function (ix) {
              var match = Caml_array.caml_array_get(points, ix)[0];
              return /* array */[
                      1,
                      match[0],
                      match[1]
                    ];
            })));
  var match = ML$ReasonReactExamples.norm(__x, /* array */[
        1,
        2
      ], /* () */0);
  var y = LinAlg$ReasonReactExamples.Matrix.make($$Array.init(800, (function (row) {
              return $$Array.init(6, (function (col) {
                            var match = (Caml_array.caml_array_get(points, row)[1] - col | 0) === 0;
                            if (match) {
                              return 1.0;
                            } else {
                              return 0.0;
                            }
                          }));
            })));
  return React.createElement(LogisticRegression$Train, {
              x_m: match[0],
              y: y
            });
}

var make = LogisticRegression;

exports.Fit = Fit;
exports.Train = Train;
exports.make = make;
/* react Not a pure module */
