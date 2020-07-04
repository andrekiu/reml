'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");

function useStable(fn) {
  var cache = {
    contents: undefined
  };
  return (function (input) {
      var match = cache.contents;
      if (match !== undefined) {
        var t = match;
        if (Caml_obj.caml_equal(input, t[0])) {
          return t[1];
        }
        
      }
      var result = Curry._1(fn, input);
      cache.contents = /* tuple */[
        input,
        result
      ];
      return result;
    });
}

exports.useStable = useStable;
/* No side effect */
