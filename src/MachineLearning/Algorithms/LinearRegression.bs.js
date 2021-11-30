'use strict';

var List = require("rescript/lib/js/list.js");
var $$Array = require("rescript/lib/js/array.js");
var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Random = require("rescript/lib/js/random.js");
var Belt_List = require("rescript/lib/js/belt_List.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Caml_format = require("rescript/lib/js/caml_format.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");
var ML$ReasonReactExamples = require("../ML.bs.js");
var Canvas$ReasonReactExamples = require("../Canvas.bs.js");
var LinAlg$ReasonReactExamples = require("../LinAlg.bs.js");
var Stylus$ReasonReactExamples = require("../Stylus.bs.js");
var DataGen$ReasonReactExamples = require("../DataGen.bs.js");

function LinearRegression$HypothesisFit(Props) {
  var x_m = Props.x_m;
  var y = Props.y;
  var theta = Props.theta;
  var points = React.useMemo(function () {
        return $$Array.init(LinAlg$ReasonReactExamples.Matrix.size(x_m)[0], (function (ix) {
                      return [
                              LinAlg$ReasonReactExamples.Matrix.get(ix, 1, x_m),
                              LinAlg$ReasonReactExamples.Matrix.get(ix, 0, y)
                            ];
                    }));
      });
  var dims = [
    400,
    400
  ];
  return React.createElement(Canvas$ReasonReactExamples.make, {
              children: (function (ctx, scale) {
                  var h = function (x) {
                    return LinAlg$ReasonReactExamples.Matrix.get(0, 0, theta) + x * LinAlg$ReasonReactExamples.Matrix.get(1, 0, theta);
                  };
                  var match = Curry._2(scale, points, dims);
                  var match$1 = match[1];
                  var high = match$1[1];
                  var low = match$1[0];
                  var extremes_0 = [
                    low,
                    h(low)
                  ];
                  var extremes_1 = {
                    hd: [
                      high,
                      h(high)
                    ],
                    tl: /* [] */0
                  };
                  var extremes = {
                    hd: extremes_0,
                    tl: extremes_1
                  };
                  var re = Curry._2(scale, $$Array.append($$Array.of_list(extremes), points), dims);
                  var t = re[0];
                  $$Array.iter((function (e) {
                          return Stylus$ReasonReactExamples.draw_point(ctx, Curry._1(t, e), undefined, undefined);
                        }), points);
                  return Stylus$ReasonReactExamples.draw_line(ctx, List.map(t, extremes), undefined, undefined);
                }),
              dims: dims
            });
}

var HypothesisFit = {
  make: LinearRegression$HypothesisFit
};

function LinearRegression$CostCovergence(Props) {
  var hist_theta = Props.hist_theta;
  var idx = function (l) {
    return List.length(hist_theta) - List.length(l) | 0;
  };
  var points = List.fold_left((function (sum, param) {
          return {
                  hd: [
                    idx(sum),
                    param[1]
                  ],
                  tl: sum
                };
        }), /* [] */0, hist_theta);
  var dims = [
    280,
    200
  ];
  return React.createElement(Canvas$ReasonReactExamples.make, {
              children: (function (ctx, scale) {
                  var match = Curry._2(scale, $$Array.of_list(points), dims);
                  return Stylus$ReasonReactExamples.draw_line(ctx, List.map(match[0], points), undefined, undefined);
                }),
              dims: dims
            });
}

var CostCovergence = {
  make: LinearRegression$CostCovergence
};

function LinearRegression$TimeTravel(Props) {
  var hist_theta = Props.hist_theta;
  var onSelect = Props.onSelect;
  var iters = String(List.length(hist_theta));
  return React.createElement("div", undefined, React.createElement("div", undefined, "Converged in " + iters + " steps."), React.createElement("div", {
                  style: {
                    display: "flex",
                    maxWidth: "280px",
                    minHeight: "50px",
                    overflowX: "visible",
                    overflowY: "scroll"
                  }
                }, $$Array.of_list(List.rev(List.mapi((function (ix, param) {
                                var t = param[0];
                                return React.createElement("span", {
                                            key: ix.toString(),
                                            style: {
                                              border: "solid 1px",
                                              margin: "10px",
                                              padding: "3px"
                                            },
                                            onClick: (function (param) {
                                                return Curry._1(onSelect, [
                                                            ix,
                                                            t
                                                          ]);
                                              })
                                          }, param[1].toFixed(5));
                              }), hist_theta)))));
}

var TimeTravel = {
  make: LinearRegression$TimeTravel
};

function is_stable(hist) {
  if (List.length(hist) > 200) {
    return true;
  }
  if (!hist) {
    return false;
  }
  var match = hist.tl;
  if (match) {
    return Math.abs(hist.hd[1] - match.hd[1]) < 0.00001;
  } else {
    return false;
  }
}

function get_theta(state) {
  var match = state.selection;
  if (match !== undefined) {
    return match[1];
  } else {
    return List.hd(state.hist_theta)[0];
  }
}

function get_initial_state(x_m, y) {
  var theta = LinAlg$ReasonReactExamples.Matrix.vector([
        Random.$$float(400),
        Random.$$float(400)
      ]);
  return {
          hist_theta: {
            hd: [
              theta,
              ML$ReasonReactExamples.LinReg.cost(theta, x_m, y)
            ],
            tl: /* [] */0
          },
          selection: undefined,
          alpha: 2
        };
}

function LinearRegression$FitPoly(Props) {
  var x_m = Props.x_m;
  var y = Props.y;
  var onRestart = Props.onRestart;
  var match = React.useState(function () {
        return get_initial_state(x_m, y);
      });
  var setState = match[1];
  var state = match[0];
  React.useEffect((function () {
          if (!is_stable(state.hist_theta)) {
            setTimeout((function (param) {
                    return Curry._1(setState, (function (s) {
                                  var prev = List.hd(s.hist_theta)[0];
                                  var next = ML$ReasonReactExamples.LinReg.gradient_step(s.alpha, prev, x_m, y);
                                  return {
                                          hist_theta: {
                                            hd: [
                                              next,
                                              ML$ReasonReactExamples.LinReg.cost(next, x_m, y)
                                            ],
                                            tl: s.hist_theta
                                          },
                                          selection: s.selection,
                                          alpha: s.alpha
                                        };
                                }));
                  }), 16);
          }
          
        }), [state]);
  var theta = get_theta(state);
  var m0 = LinAlg$ReasonReactExamples.Matrix.get(0, 0, theta);
  var m1 = LinAlg$ReasonReactExamples.Matrix.get(1, 0, theta);
  var sign = m1 < 0.0 ? "-" : "+";
  var str_m0 = m0.toFixed(2);
  var abs_m1 = Math.abs(m1).toFixed(2);
  var match$1 = state.selection;
  return React.createElement("div", {
              style: {
                display: "flex",
                justifyContent: "space-evenly"
              }
            }, React.createElement(LinearRegression$HypothesisFit, {
                  x_m: x_m,
                  y: y,
                  theta: get_theta(state)
                }), React.createElement("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "space-evenly"
                  }
                }, React.createElement("button", {
                      onClick: (function (param) {
                          Curry._1(setState, (function (s) {
                                  var init = get_initial_state(x_m, y);
                                  return {
                                          hist_theta: init.hist_theta,
                                          selection: init.selection,
                                          alpha: s.alpha
                                        };
                                }));
                          return Curry._1(onRestart, undefined);
                        })
                    }, "Restart"), React.createElement("span", undefined, React.createElement("label", undefined, "Prediction = "), "" + str_m0 + " " + sign + " x * " + abs_m1), React.createElement("span", undefined, React.createElement("label", undefined, "Alpha = "), React.createElement("input", {
                          defaultValue: state.alpha.toString(),
                          onBlur: (function (e) {
                              var value = e.target.value;
                              console.log(value);
                              var t;
                              try {
                                t = Caml_format.caml_float_of_string(value);
                              }
                              catch (raw_exn){
                                var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
                                if (exn.RE_EXN_ID === "Failure") {
                                  return ;
                                }
                                throw exn;
                              }
                              return Curry._1(setState, (function (s) {
                                            return {
                                                    hist_theta: s.hist_theta,
                                                    selection: s.selection,
                                                    alpha: t
                                                  };
                                          }));
                            })
                        })), React.createElement(LinearRegression$TimeTravel, {
                      hist_theta: state.hist_theta,
                      onSelect: (function (selection) {
                          return Curry._1(setState, (function (s) {
                                        return {
                                                hist_theta: s.hist_theta,
                                                selection: selection,
                                                alpha: s.alpha
                                              };
                                      }));
                        })
                    }), React.createElement(LinearRegression$CostCovergence, {
                      hist_theta: match$1 !== undefined ? List.rev(Belt_Option.getExn(Belt_List.take(List.rev(state.hist_theta), List.length(state.hist_theta) - match$1[0] | 0))) : state.hist_theta
                    })));
}

var FitPoly = {
  is_stable: is_stable,
  get_theta: get_theta,
  get_initial_state: get_initial_state,
  make: LinearRegression$FitPoly
};

function LinearRegression(Props) {
  var match = React.useState(function () {
        return DataGen$ReasonReactExamples.Points.gen(500);
      });
  var setData = match[1];
  var match$1 = ML$ReasonReactExamples.normalize(match[0]);
  return React.createElement(LinearRegression$FitPoly, {
              x_m: match$1[0],
              y: match$1[1],
              onRestart: (function (param) {
                  return Curry._1(setData, (function (param) {
                                return DataGen$ReasonReactExamples.Points.gen(500);
                              }));
                })
            });
}

var make = LinearRegression;

exports.HypothesisFit = HypothesisFit;
exports.CostCovergence = CostCovergence;
exports.TimeTravel = TimeTravel;
exports.FitPoly = FitPoly;
exports.make = make;
/* react Not a pure module */
