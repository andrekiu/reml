'use strict';

var Curry = require("rescript/lib/js/curry.js");

var ClientMessage = {};

var WorkerMessage = {};

function start(onUpdate) {
  var worker = new Worker("/src/BoostrapWorker.bs.js");
  worker.onmessage = (function (m) {
      return Curry._1(onUpdate, m.data);
    });
  worker.postMessage({
        TAG: /* Start */0,
        _0: "0. Start Worker From the Client"
      });
  return [
          (function (m) {
              worker.postMessage(m);
              
            }),
          (function (param) {
              worker.terminate();
              
            })
        ];
}

var NISTClient = {
  start: start
};

exports.ClientMessage = ClientMessage;
exports.WorkerMessage = WorkerMessage;
exports.NISTClient = NISTClient;
/* No side effect */
