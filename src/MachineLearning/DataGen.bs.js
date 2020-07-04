'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Random = require("bs-platform/lib/js/random.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");

function gen(len) {
  Random.init(Date.now() | 0);
  var slope = Random.$$float(4);
  var shift = Random.$$float(20) - 10;
  return $$Array.init(len, (function (param) {
                var shift_error = Random.$$float(40);
                var slope_error = Random.$$float(slope / 2) - slope / 4;
                var x = Random.$$float(400.0);
                return /* tuple */[
                        x,
                        shift + shift_error + (slope + slope_error) * (Random.$$float(400) - x)
                      ];
              }));
}

function clusters(n, len) {
  Random.init(Date.now() | 0);
  var p = 1 / n;
  var circles = $$Array.init(n, (function (param) {
          return /* tuple */[
                  Random.$$float(400),
                  Random.$$float(400),
                  50.0 + Random.$$float(20)
                ];
        }));
  return $$Array.init(len, (function (param) {
                var cluster = Random.$$float(1) / p | 0;
                var match = Caml_array.caml_array_get(circles, cluster);
                var angle = 2.0 * Random.$$float(Math.acos(-1));
                var r = Random.$$float(match[2]);
                var x = Math.cos(angle) * r;
                var y = Math.sin(angle) * r;
                return /* tuple */[
                        /* tuple */[
                          match[0] + x,
                          match[1] + y
                        ],
                        cluster
                      ];
              }));
}

var Points = {
  gen: gen,
  clusters: clusters
};

exports.Points = Points;
/* No side effect */
