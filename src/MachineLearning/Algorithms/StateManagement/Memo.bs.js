'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Caml_obj = require("rescript/lib/js/caml_obj.js");

function useStable(fn) {
  var cache = {
    contents: undefined
  };
  return function (input) {
    var t = cache.contents;
    if (t !== undefined && Caml_obj.caml_equal(input, t[0])) {
      return t[1];
    }
    var result = Curry._1(fn, input);
    cache.contents = [
      input,
      result
    ];
    return result;
  };
}

exports.useStable = useStable;
/* No side effect */
