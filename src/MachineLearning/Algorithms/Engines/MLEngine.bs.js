'use strict';

var $$Array = require("rescript/lib/js/array.js");
var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var TrainingQueue$ReasonReactExamples = require("../../UI/TrainingQueue.bs.js");

function reducer(state, action) {
  switch (action.TAG | 0) {
    case /* WorkerStarted */0 :
        return {
                training: state.training,
                prediction: state.prediction,
                send_to_worker: action._0
              };
    case /* Update */1 :
        var init = state.training;
        return {
                training: {
                  samples: init.samples,
                  params: $$Array.append(state.training.params, [{
                          theta: action._0,
                          cost: action._1,
                          accuracy: action._2
                        }])
                },
                prediction: state.prediction,
                send_to_worker: state.send_to_worker
              };
    case /* SetSamples */2 :
        var init$1 = state.training;
        return {
                training: {
                  samples: action._0,
                  params: init$1.params
                },
                prediction: state.prediction,
                send_to_worker: state.send_to_worker
              };
    case /* Predicted */3 :
        return {
                training: state.training,
                prediction: {
                  TAG: /* Predicted */1,
                  _0: action._0,
                  _1: action._1
                },
                send_to_worker: state.send_to_worker
              };
    
  }
}

function use(param) {
  var match = React.useReducer(reducer, {
        training: {
          samples: [],
          params: []
        },
        prediction: /* Idle */0,
        send_to_worker: (function (param) {
            
          })
      });
  var dispatch = match[1];
  var state = match[0];
  React.useEffect((function () {
          var match = TrainingQueue$ReasonReactExamples.NISTClient.start(function (msg) {
                switch (msg.TAG | 0) {
                  case /* Ack */0 :
                      return Curry._1(dispatch, {
                                  TAG: /* SetSamples */2,
                                  _0: msg._0
                                });
                  case /* Update */1 :
                      return Curry._1(dispatch, {
                                  TAG: /* Update */1,
                                  _0: msg._0,
                                  _1: msg._1,
                                  _2: msg._2
                                });
                  case /* Prediction */2 :
                      return Curry._1(dispatch, {
                                  TAG: /* Predicted */3,
                                  _0: msg._0,
                                  _1: msg._1
                                });
                  
                }
              });
          Curry._1(dispatch, {
                TAG: /* WorkerStarted */0,
                _0: match[0]
              });
          return match[1];
        }), []);
  return [
          state,
          (function (e) {
              return Curry._1(state.send_to_worker, {
                          TAG: /* Predict */1,
                          _0: e
                        });
            })
        ];
}

exports.reducer = reducer;
exports.use = use;
/* react Not a pure module */
