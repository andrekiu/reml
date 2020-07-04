'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Random = require("bs-platform/lib/js/random.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var ML$ReasonReactExamples = require("./MachineLearning/ML.bs.js");
var LinAlg$ReasonReactExamples = require("./MachineLearning/LinAlg.bs.js");

function parseImage(blob) {
  var ans = $$Array.make_matrix(28, 28, 0.0);
  var loop = function (_ix) {
    while(true) {
      var ix = _ix;
      if (ix === 784) {
        return /* () */0;
      } else {
        var r = ix / 28 | 0;
        var c = ix % 28;
        Caml_array.caml_array_set(Caml_array.caml_array_get(ans, r), c, blob[ix]);
        _ix = ix + 1 | 0;
        continue ;
      }
    };
  };
  loop(0);
  return LinAlg$ReasonReactExamples.Matrix.make(ans);
}

function download(param) {
  return Promise.all(/* tuple */[
                    fetch("t10k-images-idx3-ubyte"),
                    fetch("t10k-labels-idx1-ubyte")
                  ]).then((function (param) {
                    return Promise.all(/* tuple */[
                                param[0].blob(),
                                param[1].blob()
                              ]);
                  })).then((function (param) {
                  return Promise.all(/* tuple */[
                              param[0].arrayBuffer(),
                              param[1].arrayBuffer()
                            ]);
                })).then((function (param) {
                var labels = param[1];
                var images = param[0];
                return Promise.resolve($$Array.init(10000, (function (ix) {
                                  return {
                                          digit: parseImage(new Uint8Array(images.slice(Caml_int32.imul(784, ix) + 16 | 0, 16 + Caml_int32.imul(Caml_int32.imul(ix + 1 | 0, 28), 28) | 0))),
                                          label: new Uint8Array(labels.slice(ix + 8 | 0, (8 + ix | 0) + 1 | 0))[0]
                                        };
                                })));
              }));
}

var DataFetching = {
  parseImage: parseImage,
  download: download
};

function massage(entries) {
  var m = entries.length;
  var flatten = function (m) {
    return $$Array.init(784, (function (bit) {
                  var match = LinAlg$ReasonReactExamples.Matrix.get(bit / 28 | 0, bit % 28, m) >= 1.0;
                  if (match) {
                    return 255.0;
                  } else {
                    return 0.0;
                  }
                }));
  };
  var __x = LinAlg$ReasonReactExamples.Matrix.make($$Array.init(m, (function (ix) {
              return flatten(Caml_array.caml_array_get(entries, ix).digit);
            })));
  var __x$1 = LinAlg$ReasonReactExamples.Matrix.add_col(1, __x);
  var match = ML$ReasonReactExamples.norm(__x$1, $$Array.init(784, (function (ix) {
              return ix + 1 | 0;
            })), /* () */0);
  var norm = match[1];
  var y = LinAlg$ReasonReactExamples.Matrix.make($$Array.init(m, (function (ix) {
              var label = Caml_array.caml_array_get(entries, ix).label;
              return $$Array.init(10, (function (il) {
                            var match = il === label;
                            if (match) {
                              return 1.0;
                            } else {
                              return 0.0;
                            }
                          }));
            })));
  var theta = LinAlg$ReasonReactExamples.Matrix.make($$Array.init(785, (function (param) {
              return $$Array.init(10, (function (param) {
                            return Random.$$float(1);
                          }));
            })));
  return /* tuple */[
          match[0],
          y,
          theta,
          (function (m) {
              var __x = LinAlg$ReasonReactExamples.Matrix.make(/* array */[flatten(m)]);
              return Curry._1(norm, LinAlg$ReasonReactExamples.Matrix.add_col(1.0, __x));
            })
        ];
}

var Initialize = {
  massage: massage
};

var current = {
  contents: undefined
};

function update(param) {
  current.contents = {
    theta: param[0],
    cost: param[1],
    accuracy: param[2],
    normalizer: param[3]
  };
  return /* () */0;
}

function predict(sample) {
  var match = current.contents;
  if (match !== undefined) {
    var match$1 = match;
    return ML$ReasonReactExamples.NIST.predict(match$1.theta, Curry._1(match$1.normalizer, sample));
  } else {
    return LinAlg$ReasonReactExamples.Matrix.make(/* array */[$$Array.init(10, (function (param) {
                        return 0.0;
                      }))]);
  }
}

var WorkerState = {
  current: current,
  update: update,
  predict: predict
};

self.onmessage = (function (m) {
    var match = m.data;
    if (match.tag) {
      var sample = match[0];
      postMessage(/* Prediction */Block.__(2, [
              sample,
              predict(sample)
            ]));
      return /* () */0;
    } else {
      console.log(match[0]);
      console.log("1. Started downloading images and labels");
      download(/* () */0).then((function (entries) {
              console.log("2. Finish downloading");
              console.log("3. Start Training");
              postMessage(/* Ack */Block.__(0, [entries]));
              var match = massage(entries);
              var norm = match[3];
              var y = match[1];
              var x_m = match[0];
              var theta_ref = {
                contents: match[2]
              };
              var epoch = {
                contents: 0
              };
              var loop = function (param) {
                var match = epoch.contents < 40;
                if (match) {
                  theta_ref.contents = ML$ReasonReactExamples.LogReg.gradient_step(100.0, theta_ref.contents, x_m, y);
                  var accuracy = ML$ReasonReactExamples.NIST.accuracy(theta_ref.contents, x_m, y);
                  var cost = ML$ReasonReactExamples.LogReg.cost(theta_ref.contents, x_m, y);
                  update(/* tuple */[
                        theta_ref.contents,
                        cost,
                        accuracy,
                        norm
                      ]);
                  postMessage(/* Update */Block.__(1, [
                          theta_ref.contents,
                          cost,
                          accuracy
                        ]));
                  epoch.contents = epoch.contents + 1 | 0;
                  setTimeout(loop, 100);
                  return /* () */0;
                } else {
                  return /* () */0;
                }
              };
              loop(/* () */0);
              return Promise.resolve(entries);
            }));
      return /* () */0;
    }
  });

exports.DataFetching = DataFetching;
exports.Initialize = Initialize;
exports.WorkerState = WorkerState;
/*  Not a pure module */
