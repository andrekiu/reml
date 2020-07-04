'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Random = require("bs-platform/lib/js/random.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");
var CamlinternalOO = require("bs-platform/lib/js/camlinternalOO.js");
var Canvas$ReasonReactExamples = require("../Canvas.bs.js");
var LinAlg$ReasonReactExamples = require("../LinAlg.bs.js");
var Stylus$ReasonReactExamples = require("../Stylus.bs.js");
var TrainingQueue$ReasonReactExamples = require("../UI/TrainingQueue.bs.js");

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

var class_tables = /* Cons */[
  0,
  0,
  0
];

function DetectDigits$WriteDigit(Props) {
  var onChange = Props.onChange;
  return React.createElement(Canvas$ReasonReactExamples.make, {
              children: (function (param, param$1) {
                  if (!class_tables[0]) {
                    var $$class = CamlinternalOO.create_table(0);
                    var env = CamlinternalOO.new_variable($$class, "");
                    var env_init = function (env$1) {
                      var self = CamlinternalOO.create_object_opt(0, $$class);
                      self[env] = env$1;
                      return self;
                    };
                    CamlinternalOO.init_class($$class);
                    class_tables[0] = env_init;
                  }
                  return Curry._1(class_tables[0], 0);
                }),
              dims: /* tuple */[
                100,
                100
              ],
              writeble: true,
              onChange: (function (p) {
                  return Curry._1(onChange, massage(p));
                })
            });
}

var WriteDigit = {
  massage: massage,
  make: DetectDigits$WriteDigit
};

function shuffle(samples) {
  Random.init(Date.now() | 0);
  var __x = Belt_Array.shuffle(samples);
  return $$Array.sub(__x, 0, Caml_primitive.caml_int_min(samples.length, 50));
}

function DetectDigits$DigitGallery(Props) {
  var samples = Props.samples;
  var onSelect = Props.onSelect;
  var match = React.useState((function () {
          return shuffle(samples);
        }));
  var setSelection = match[1];
  React.useEffect((function () {
          Curry._1(setSelection, (function (s) {
                  var match = s.length === 0;
                  if (match) {
                    return shuffle(samples);
                  } else {
                    return s;
                  }
                }));
          return ;
        }), /* array */[samples]);
  var views = $$Array.map((function (e) {
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
        }), match[0]);
  return React.createElement("div", undefined, React.createElement("div", undefined, React.createElement("span", undefined, "Example of digits in the dataset"), React.createElement("span", undefined, React.createElement("button", {
                          onClick: (function (param) {
                              return Curry._1(setSelection, (function (param) {
                                            return shuffle(samples);
                                          }));
                            })
                        }, "Shuffle"))), React.createElement("div", {
                  style: {
                    display: "flex",
                    flexFlow: "wrap"
                  }
                }, views));
}

var DigitGallery = {
  shuffle: shuffle,
  make: DetectDigits$DigitGallery
};

function DetectDigits$LineChart(Props) {
  var dims = Props.dims;
  var values = Props.values;
  return React.createElement(Canvas$ReasonReactExamples.make, {
              children: (function (ctx, scale) {
                  var match = List.length(values) > 0;
                  if (match) {
                    var match$1 = Curry._2(scale, $$Array.of_list(values), dims);
                    return Stylus$ReasonReactExamples.draw_line(ctx, List.map(match$1[0], values), undefined, /* () */0);
                  } else {
                    return /* () */0;
                  }
                }),
              dims: dims
            });
}

var LineChart = {
  make: DetectDigits$LineChart
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
                    }, "Epoch : " + (String(epoch) + "")), React.createElement(DetectDigits$LineChart, {
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
                        return React.createElement("div", undefined, React.createElement("div", undefined, "" + (String(digit) + "")), React.createElement(DetectDigits$LineChart, {
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

function texp(n) {
  if (n !== -1) {
    if (n !== 0) {
      var x = texp(n / 2 | 0);
      var match = n % 2 === -1;
      return x * x * (
              match ? 1 / 10 : 1
            );
    } else {
      return 1;
    }
  } else {
    return 1 / 10;
  }
}

function DetectDigits$Bar(Props) {
  var sz = Props.sz;
  var value = Props.value;
  return React.createElement(Canvas$ReasonReactExamples.make, {
              children: (function (ctx, param) {
                  return $$Array.iteri((function (ix, e) {
                                var match = value >= e;
                                if (match) {
                                  return Stylus$ReasonReactExamples.draw_square(ctx, /* tuple */[
                                              ix * 20,
                                              0.0
                                            ], 20, 255 - 255 / 10 * ix);
                                } else {
                                  return /* () */0;
                                }
                              }), /* array */[
                              texp(-150),
                              texp(-100),
                              texp(-50),
                              texp(-20),
                              texp(-10),
                              texp(-5),
                              0.0001,
                              0.001,
                              0.01,
                              0.5
                            ]);
                }),
              dims: /* tuple */[
                sz,
                20
              ]
            });
}

var Bar = {
  texp: texp,
  make: DetectDigits$Bar
};

function column(param) {
  return {
          display: "flex",
          flex: "1",
          flexDirection: "column"
        };
}

function DetectDigits$Prediction(Props) {
  var toPredict = Props.toPredict;
  var onChange = Props.onChange;
  var match = React.useState((function () {
          return ;
        }));
  var setDigit = match[1];
  var tmp;
  if (typeof toPredict === "number" || !toPredict.tag) {
    tmp = React.createElement("span", undefined);
  } else {
    var prediction = toPredict[1];
    var __x = $$Array.init(10, (function (ix) {
            return LinAlg$ReasonReactExamples.Matrix.get(0, ix, prediction);
          }));
    tmp = React.createElement("div", {
          style: {
            display: "flex"
          }
        }, React.createElement("div", undefined, $$Array.mapi((function (ix, v) {
                    var round = v.toPrecision(5);
                    return React.createElement("div", {
                                style: {
                                  display: "flex",
                                  width: "100%",
                                  flexDirection: "row"
                                }
                              }, React.createElement("span", {
                                    style: column(/* () */0)
                                  }, "" + (String(ix) + (" : " + (String(round) + "")))), React.createElement("span", {
                                    style: column(/* () */0)
                                  }, React.createElement(DetectDigits$Bar, {
                                        sz: 200,
                                        value: v
                                      })));
                  }), __x)), React.createElement(DetectDigits$Digit, {
              dims: /* tuple */[
                100,
                100
              ],
              value: toPredict[0]
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
  make: DetectDigits$Prediction
};

function reducer(state, action) {
  switch (action.tag | 0) {
    case /* WorkerStarted */0 :
        return {
                training: state.training,
                to_predict: state.to_predict,
                send_to_worker: action[0]
              };
    case /* Update */1 :
        var init = state.training;
        return {
                training: {
                  samples: init.samples,
                  params: $$Array.append(state.training.params, /* array */[{
                          theta: action[0],
                          cost: action[1],
                          accuracy: action[2]
                        }])
                },
                to_predict: state.to_predict,
                send_to_worker: state.send_to_worker
              };
    case /* SetSamples */2 :
        var init$1 = state.training;
        return {
                training: {
                  samples: action[0],
                  params: init$1.params
                },
                to_predict: state.to_predict,
                send_to_worker: state.send_to_worker
              };
    case /* Predicted */3 :
        var pred = action[1];
        console.log(pred);
        return {
                training: state.training,
                to_predict: /* Predicted */Block.__(1, [
                    action[0],
                    pred
                  ]),
                send_to_worker: state.send_to_worker
              };
    
  }
}

function useWebWorker(param) {
  var match = React.useReducer(reducer, {
        training: {
          samples: /* array */[],
          params: /* array */[]
        },
        to_predict: /* Idle */0,
        send_to_worker: (function (param) {
            return /* () */0;
          })
      });
  var dispatch = match[1];
  React.useEffect((function () {
          var match = TrainingQueue$ReasonReactExamples.NISTClient.start((function (msg) {
                  switch (msg.tag | 0) {
                    case /* Ack */0 :
                        return Curry._1(dispatch, /* SetSamples */Block.__(2, [msg[0]]));
                    case /* Update */1 :
                        return Curry._1(dispatch, /* Update */Block.__(1, [
                                      msg[0],
                                      msg[1],
                                      msg[2]
                                    ]));
                    case /* Prediction */2 :
                        return Curry._1(dispatch, /* Predicted */Block.__(3, [
                                      msg[0],
                                      msg[1]
                                    ]));
                    
                  }
                }));
          Curry._1(dispatch, /* WorkerStarted */Block.__(0, [match[0]]));
          return match[1];
        }), ([]));
  return match[0];
}

function DetectDigits$LambdaSlider(Props) {
  var lambda = Props.lambda;
  var onChange = Props.onChange;
  return React.createElement("input", {
              defaultValue: lambda,
              onBlur: (function (v) {
                  return Curry._1(onChange, Number(v.target.value));
                })
            });
}

var LambdaSlider = {
  make: DetectDigits$LambdaSlider
};

function DetectDigits(Props) {
  var match = React.useState((function () {
          return 0.0;
        }));
  var setLambda = match[1];
  var state = useWebWorker(/* () */0);
  return React.createElement("span", undefined, React.createElement(DetectDigits$DigitGallery, {
                  samples: state.training.samples,
                  onSelect: (function (e) {
                      return Curry._1(state.send_to_worker, /* Predict */Block.__(1, [e]));
                    })
                }), React.createElement("div", undefined, React.createElement(DetectDigits$LambdaSlider, {
                      lambda: Pervasives.string_of_float(match[0]),
                      onChange: (function (v) {
                          return Curry._1(setLambda, (function (param) {
                                        return v;
                                      }));
                        })
                    }), React.createElement("button", undefined, "Start")), React.createElement(DetectDigits$ModelDebugging, {
                  params: state.training.params
                }), React.createElement(DetectDigits$Prediction, {
                  toPredict: state.to_predict,
                  onChange: (function (e) {
                      return Curry._1(state.send_to_worker, /* Predict */Block.__(1, [e]));
                    })
                }));
}

var make = DetectDigits;

exports.forn = forn;
exports.Digit = Digit;
exports.WriteDigit = WriteDigit;
exports.DigitGallery = DigitGallery;
exports.LineChart = LineChart;
exports.ModelDebugging = ModelDebugging;
exports.Bar = Bar;
exports.Prediction = Prediction;
exports.reducer = reducer;
exports.useWebWorker = useWebWorker;
exports.LambdaSlider = LambdaSlider;
exports.make = make;
/* react Not a pure module */
