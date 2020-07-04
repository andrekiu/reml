'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");

var ClientMessage = { };

var WorkerMessage = { };

function start(onUpdate) {
  var worker = new Worker("/src/BoostrapWorker.bs.js");
  worker.onmessage = (function (m) {
      return Curry._1(onUpdate, m.data);
    });
  worker.postMessage(/* Start */Block.__(0, ["0. Start Worker From the Client"]));
  return /* tuple */[
          (function (m) {
              worker.postMessage(m);
              return /* () */0;
            }),
          (function (param) {
              worker.terminate();
              return /* () */0;
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
