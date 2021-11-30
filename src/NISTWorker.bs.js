'use strict';

var $$Array = require("rescript/lib/js/array.js");
var Curry = require("rescript/lib/js/curry.js");
var Random = require("rescript/lib/js/random.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var ML$ReasonReactExamples = require("./MachineLearning/ML.bs.js");
var LinAlg$ReasonReactExamples = require("./MachineLearning/LinAlg.bs.js");

var getBlob = (function(promise) {
    return promise.blob();
  });

var getArrayBuffer = (function(promise) {
    return promise.arrayBuffer();
  });

var slice = (function(arr, a, b) {
    return arr.slice(a, b);
  });

function parseImage(blob) {
  var ans = $$Array.make_matrix(28, 28, 0.0);
  var loop = function (_ix) {
    while(true) {
      var ix = _ix;
      if (ix === 784) {
        return ;
      }
      var r = ix / 28 | 0;
      var c = ix % 28;
      Caml_array.set(Caml_array.get(ans, r), c, blob[ix]);
      _ix = ix + 1 | 0;
      continue ;
    };
  };
  loop(0);
  return LinAlg$ReasonReactExamples.Matrix.make(ans);
}

function download(param) {
  return Promise.all([
                    fetch("t10k-images-idx3-ubyte"),
                    fetch("t10k-labels-idx1-ubyte")
                  ]).then(function (param) {
                  return Promise.all([
                              getBlob(param[0]),
                              getBlob(param[1])
                            ]);
                }).then(function (param) {
                return Promise.all([
                            getArrayBuffer(param[0]),
                            getArrayBuffer(param[1])
                          ]);
              }).then(function (param) {
              var labels = param[1];
              var images = param[0];
              return Promise.resolve($$Array.init(10000, (function (ix) {
                                return {
                                        digit: parseImage(new Uint8Array(slice(images, Math.imul(784, ix) + 16 | 0, 16 + Math.imul(Math.imul(ix + 1 | 0, 28), 28) | 0))),
                                        label: new Uint8Array(slice(labels, ix + 8 | 0, (8 + ix | 0) + 1 | 0))[0]
                                      };
                              })));
            });
}

var DataFetching = {
  parseImage: parseImage,
  download: download
};

function massage(entries) {
  var m = entries.length;
  var flatten = function (m) {
    return $$Array.init(784, (function (bit) {
                  if (LinAlg$ReasonReactExamples.Matrix.get(bit / 28 | 0, bit % 28, m) >= 1.0) {
                    return 255.0;
                  } else {
                    return 0.0;
                  }
                }));
  };
  var __x = LinAlg$ReasonReactExamples.Matrix.make($$Array.init(m, (function (ix) {
              return flatten(Caml_array.get(entries, ix).digit);
            })));
  var __x$1 = LinAlg$ReasonReactExamples.Matrix.add_col(1, __x);
  var match = ML$ReasonReactExamples.norm(__x$1, $$Array.init(784, (function (ix) {
              return ix + 1 | 0;
            })), undefined);
  var norm = match[1];
  var y = LinAlg$ReasonReactExamples.Matrix.make($$Array.init(m, (function (ix) {
              var label = Caml_array.get(entries, ix).label;
              return $$Array.init(10, (function (il) {
                            if (il === label) {
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
  return [
          match[0],
          y,
          theta,
          (function (m) {
              var __x = LinAlg$ReasonReactExamples.Matrix.make([flatten(m)]);
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
  
}

function predict(sample) {
  var match = current.contents;
  if (match !== undefined) {
    return ML$ReasonReactExamples.NIST.predict(match.theta, Curry._1(match.normalizer, sample));
  } else {
    return LinAlg$ReasonReactExamples.Matrix.make([$$Array.init(10, (function (param) {
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
    var msg = m.data;
    if (msg.TAG === /* Start */0) {
      console.log(msg._0);
      console.log("1. Started downloading images and labels");
      download(undefined).then(function (entries) {
            console.log("2. Finish downloading");
            console.log("3. Start Training");
            postMessage({
                  TAG: /* Ack */0,
                  _0: entries
                });
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
              if (epoch.contents >= 40) {
                return ;
              }
              theta_ref.contents = ML$ReasonReactExamples.LogReg.gradient_step(100.0, theta_ref.contents, x_m, y);
              var accuracy = ML$ReasonReactExamples.NIST.accuracy(theta_ref.contents, x_m, y);
              var cost = ML$ReasonReactExamples.LogReg.cost(theta_ref.contents, x_m, y);
              update([
                    theta_ref.contents,
                    cost,
                    accuracy,
                    norm
                  ]);
              postMessage({
                    TAG: /* Update */1,
                    _0: theta_ref.contents,
                    _1: cost,
                    _2: accuracy
                  });
              epoch.contents = epoch.contents + 1 | 0;
              setTimeout(loop, 100);
              
            };
            loop(undefined);
            return Promise.resolve(entries);
          });
      return ;
    }
    var sample = msg._0;
    postMessage({
          TAG: /* Prediction */2,
          _0: sample,
          _1: predict(sample)
        });
    
  });

exports.getBlob = getBlob;
exports.getArrayBuffer = getArrayBuffer;
exports.slice = slice;
exports.DataFetching = DataFetching;
exports.Initialize = Initialize;
exports.WorkerState = WorkerState;
/*  Not a pure module */
