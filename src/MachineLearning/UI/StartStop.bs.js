'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function StartStop(Props) {
  var children = Props.children;
  var match = React.useState((function () {
          return false;
        }));
  var setStatus = match[1];
  var status = match[0];
  return React.createElement("div", undefined, React.createElement("button", {
                  onClick: (function (param) {
                      return Curry._1(setStatus, (function (prev) {
                                    return !prev;
                                  }));
                    })
                }, status ? "Pause" : "Start"), status ? children : null);
}

var make = StartStop;

exports.make = make;
/* react Not a pure module */
