'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Random = require("bs-platform/lib/js/random.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");
var Viz$ReasonReactExamples = require("../Viz/Viz.bs.js");
var Memo$ReasonReactExamples = require("./StateManagement/Memo.bs.js");
var Canvas$ReasonReactExamples = require("../Canvas.bs.js");
var LinAlg$ReasonReactExamples = require("../LinAlg.bs.js");
var Stylus$ReasonReactExamples = require("../Stylus.bs.js");
var MLEngine$ReasonReactExamples = require("./Engines/MLEngine.bs.js");

function forn(fn, n) {
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

function unit(param) {
  return 1 / 28 * param[0];
}

function pointInCanvas(param, dims) {
  var side = unit(dims);
  return /* tuple */[
          param[0] * side,
          param[1] * side
        ];
}

function DetectDigits$Digit(Props) {
  var dims = Props.dims;
  var value = Props.value;
  var side = unit(dims);
  return React.createElement("span", undefined, React.createElement(Canvas$ReasonReactExamples.make, {
                  children: (function (ctx, param) {
                      return forn((function (idx) {
                                    var row = idx / 28 | 0;
                                    var col = idx % 28;
                                    var value$1 = LinAlg$ReasonReactExamples.Matrix.get(row, col, value);
                                    return Stylus$ReasonReactExamples.draw_square(ctx, pointInCanvas(/* tuple */[
                                                    col,
                                                    row
                                                  ], dims), side, 255.0 - value$1);
                                  }), 784);
                    }),
                  dims: dims
                }));
}

var Digit = {
  unit: unit,
  pointInCanvas: pointInCanvas,
  make: DetectDigits$Digit
};

function massage(p) {
  var m = LinAlg$ReasonReactExamples.Matrix.make($$Array.init(28, (function (param) {
              return $$Array.init(28, (function (param) {
                            return 0.0;
                          }));
            })));
  var sz = 100.0 / 28.0;
  List.iter((function (param) {
          var nx = param[0] / sz | 0;
          var ny = param[1] / sz | 0;
          if (nx < 0 || nx >= 28 || ny < 0 || ny >= 28) {
            return /* () */0;
          } else {
            return LinAlg$ReasonReactExamples.Matrix.set(ny, nx, 255.0, m);
          }
        }), p);
  return m;
}

function DetectDigits$WriteDigit(Props) {
  var onChange = Props.onChange;
  return React.createElement(Canvas$ReasonReactExamples.Write.make, {
              dims: /* tuple */[
                100,
                100
              ],
              onChange: (function (p) {
                  return Curry._1(onChange, massage(p));
                })
            });
}

var WriteDigit = {
  massage: massage,
  make: DetectDigits$WriteDigit
};

function getShuffle(param) {
  return Memo$ReasonReactExamples.useStable((function (samples) {
                Random.init(Date.now() | 0);
                var __x = Belt_Array.shuffle(samples);
                return $$Array.sub(__x, 0, Caml_primitive.caml_int_min(samples.length, 50));
              }));
}

function DetectDigits$DigitGallery(Props) {
  var samples = Props.samples;
  var onSelect = Props.onSelect;
  var match = React.useState((function () {
          return getShuffle(/* () */0);
        }));
  var setShuffle = match[1];
  return React.createElement("div", undefined, React.createElement("div", undefined, React.createElement("span", undefined, "Example of digits in the dataset"), React.createElement("span", undefined, React.createElement("button", {
                          onClick: (function (param) {
                              return Curry._1(setShuffle, (function (param) {
                                            return getShuffle(/* () */0);
                                          }));
                            })
                        }, "Shuffle"))), React.createElement("div", {
                  style: {
                    display: "flex",
                    flexFlow: "wrap"
                  }
                }, $$Array.map((function (e) {
                        return React.createElement("span", {
                                    onClick: (function (param) {
                                        return Curry._1(onSelect, e.digit);
                                      })
                                  }, React.createElement(DetectDigits$Digit, {
                                        dims: /* tuple */[
                                          65,
                                          65
                                        ],
                                        value: e.digit
                                      }));
                      }), Curry._1(match[0], samples))));
}

var DigitGallery = {
  getShuffle: getShuffle,
  make: DetectDigits$DigitGallery
};

function getSparkline($$window, fn) {
  return $$Array.to_list($$Array.mapi((function (ix, p) {
                    return /* tuple */[
                            ix,
                            Curry._1(fn, p)
                          ];
                  }), $$window));
}

function DetectDigits$ModelDebugging(Props) {
  var params = Props.params;
  var epoch = params.length;
  var $$window = $$Array.sub(params, Caml_primitive.caml_int_max(0, params.length - 20 | 0), Caml_primitive.caml_int_min(20, params.length));
  return React.createElement("div", undefined, React.createElement("div", undefined, "Viz the convergence"), React.createElement("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    flexFlow: "wrap",
                    justifyContent: "center"
                  }
                }, React.createElement("div", {
                      style: {
                        marginRight: "20px"
                      }
                    }, "Epoch : " + (String(epoch) + "")), React.createElement(Viz$ReasonReactExamples.Line.make, {
                      dims: /* tuple */[
                        500,
                        100
                      ],
                      values: getSparkline($$window, (function (p) {
                              return p.accuracy;
                            }))
                    })), React.createElement("div", {
                  style: {
                    display: "flex",
                    flexFlow: "wrap"
                  }
                }, $$Array.init(10, (function (digit) {
                        return React.createElement("div", undefined, React.createElement("div", undefined, "" + (String(digit) + "")), React.createElement(Viz$ReasonReactExamples.Line.make, {
                                        dims: /* tuple */[
                                          137,
                                          137
                                        ],
                                        values: getSparkline($$window, (function (p) {
                                                return LinAlg$ReasonReactExamples.Matrix.get(0, digit, p.cost);
                                              }))
                                      }));
                      }))));
}

var ModelDebugging = {
  getSparkline: getSparkline,
  make: DetectDigits$ModelDebugging
};

function column(param) {
  return {
          display: "flex",
          flex: "1",
          flexDirection: "column"
        };
}

function flex(param) {
  return {
          display: "flex",
          width: "100%",
          flexDirection: "row"
        };
}

function DetectDigits$Prediction(Props) {
  var prediction = Props.prediction;
  var onChange = Props.onChange;
  var match = React.useState((function () {
          return ;
        }));
  var setDigit = match[1];
  var tmp;
  if (typeof prediction === "number" || !prediction.tag) {
    tmp = React.createElement("span", undefined);
  } else {
    var prediction$1 = prediction[1];
    var __x = $$Array.init(10, (function (ix) {
            return LinAlg$ReasonReactExamples.Matrix.get(0, ix, prediction$1);
          }));
    tmp = React.createElement("div", {
          style: {
            display: "flex"
          }
        }, React.createElement("div", undefined, $$Array.mapi((function (ix, v) {
                    var round = v.toPrecision(5);
                    return React.createElement("div", {
                                key: "" + (String(ix) + (": " + (String(round) + ""))),
                                style: flex(/* () */0)
                              }, React.createElement("span", {
                                    style: column(/* () */0)
                                  }, "" + (String(ix) + (" : " + (String(round) + "")))), React.createElement("span", {
                                    style: column(/* () */0)
                                  }, React.createElement(Viz$ReasonReactExamples.Bar.make, {
                                        sz: 200,
                                        value: v
                                      })));
                  }), __x)), React.createElement(DetectDigits$Digit, {
              dims: /* tuple */[
                100,
                100
              ],
              value: prediction[0]
            }));
  }
  return React.createElement("div", undefined, React.createElement("div", undefined, "Hello I predict stuff"), React.createElement(DetectDigits$WriteDigit, {
                  onChange: (function (digit) {
                      Curry._1(setDigit, (function (param) {
                              return digit;
                            }));
                      return Curry._1(onChange, digit);
                    })
                }), tmp);
}

var Prediction = {
  column: column,
  flex: flex,
  make: DetectDigits$Prediction
};

function DetectDigits(Props) {
  var match = MLEngine$ReasonReactExamples.use(/* () */0);
  var genPrediction = match[1];
  var match$1 = match[0];
  var training = match$1.training;
  return React.createElement("span", undefined, React.createElement(DetectDigits$DigitGallery, {
                  samples: training.samples,
                  onSelect: genPrediction
                }), React.createElement(DetectDigits$ModelDebugging, {
                  params: training.params
                }), React.createElement(DetectDigits$Prediction, {
                  prediction: match$1.prediction,
                  onChange: genPrediction
                }));
}

var make = DetectDigits;

exports.forn = forn;
exports.Digit = Digit;
exports.WriteDigit = WriteDigit;
exports.DigitGallery = DigitGallery;
exports.ModelDebugging = ModelDebugging;
exports.Prediction = Prediction;
exports.make = make;
/* react Not a pure module */
