'use strict';

var List = require("rescript/lib/js/list.js");
var $$Array = require("rescript/lib/js/array.js");
var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Canvas$ReasonReactExamples = require("../Canvas.bs.js");
var Stylus$ReasonReactExamples = require("../Stylus.bs.js");

function texp(n) {
  if (n === -1) {
    return 1 / 10;
  }
  if (n === 0) {
    return 1;
  }
  var x = texp(n / 2 | 0);
  return x * x * (
          n % 2 === -1 ? 1 / 10 : 1
        );
}

function Viz$Bar(Props) {
  var sz = Props.sz;
  var value = Props.value;
  return React.createElement(Canvas$ReasonReactExamples.make, {
              children: (function (ctx, param) {
                  return $$Array.iteri((function (ix, e) {
                                if (value >= e) {
                                  return Stylus$ReasonReactExamples.draw_square(ctx, [
                                              ix * 20,
                                              0.0
                                            ], 20, 255 - 255 / 10 * ix);
                                }
                                
                              }), [
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
              dims: [
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
                  if (List.length(values) <= 0) {
                    return ;
                  }
                  var match = Curry._2(scale, $$Array.of_list(values), dims);
                  return Stylus$ReasonReactExamples.draw_line(ctx, List.map(match[0], values), undefined, undefined);
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
