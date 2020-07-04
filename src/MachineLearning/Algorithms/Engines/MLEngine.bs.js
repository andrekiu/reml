'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var TrainingQueue$ReasonReactExamples = require("../../UI/TrainingQueue.bs.js");

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

function use(param) {
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
  var state = match[0];
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
  return /* tuple */[
          state,
          state.send_to_worker
        ];
}

exports.reducer = reducer;
exports.use = use;
/* react Not a pure module */
