'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Canvas$ReasonReactExamples = require("../Canvas.bs.js");
var Stylus$ReasonReactExamples = require("../Stylus.bs.js");

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

function Viz$Bar(Props) {
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
  make: Viz$Bar
};

function Viz$Line(Props) {
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

var Line = {
  make: Viz$Line
};

exports.Bar = Bar;
exports.Line = Line;
/* react Not a pure module */
