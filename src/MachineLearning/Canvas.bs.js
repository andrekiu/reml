'use strict';

var Caml = require("rescript/lib/js/caml.js");
var List = require("rescript/lib/js/list.js");
var $$Array = require("rescript/lib/js/array.js");
var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Caml_array = require("rescript/lib/js/caml_array.js");
var Pervasives = require("rescript/lib/js/pervasives.js");
var Stylus$ReasonReactExamples = require("./Stylus.bs.js");

function apply_changes(canvasMaybe, fn) {
  if (!(canvasMaybe == null)) {
    Curry._1(fn, canvasMaybe.getContext("2d"));
    return ;
  }
  
}

function scale(points, dims) {
  var dim_scale = function (v, limit) {
    var match = $$Array.fold_left((function (sum, e) {
            return [
                    Caml.caml_float_min(sum[0], e),
                    Caml.caml_float_max(sum[1], e)
                  ];
          }), [
          Caml_array.get(v, 0),
          Caml_array.get(v, 0)
        ], v);
    var high = match[1];
    var low = match[0];
    return [
            (function (e) {
                return (e - low) * limit / (high - low);
              }),
            [
              low,
              high
            ]
          ];
  };
  var match = dim_scale($$Array.map((function (e) {
              return e[0];
            }), points), dims[0]);
  var gen_x = match[0];
  var match$1 = dim_scale($$Array.map((function (e) {
              return e[1];
            }), points), dims[1]);
  var gen_y = match$1[0];
  return [
          (function (p) {
              return [
                      Curry._1(gen_x, p[0]),
                      dims[1] - Curry._1(gen_y, p[1])
                    ];
            }),
          match[1]
        ];
}

function useSyncCanvas(fn, dims) {
  var canvasRef = React.useRef(null);
  React.useEffect((function () {
          var canvasMaybe = canvasRef.current;
          apply_changes(canvasMaybe, (function (ctx) {
                  Stylus$ReasonReactExamples.clear_canvas(ctx, dims);
                  Curry._2(fn, ctx, scale);
                  
                }));
          
        }), [
        canvasRef,
        fn
      ]);
  return canvasRef;
}

function Canvas(Props) {
  var children = Props.children;
  var dims = Props.dims;
  var canvasRef = useSyncCanvas(children, dims);
  return React.createElement("canvas", {
              ref: canvasRef,
              height: String(dims[1]),
              width: String(dims[0])
            });
}

function noop(state, param) {
  return state;
}

function getOffset(e) {
  var $$native = e.nativeEvent;
  var p_0 = $$native.offsetX;
  var p_1 = $$native.offsetY;
  var d = List.map((function (prim) {
          return prim;
        }), {
        hd: 0,
        tl: {
          hd: -1,
          tl: {
            hd: 1,
            tl: {
              hd: -2,
              tl: {
                hd: 2,
                tl: /* [] */0
              }
            }
          }
        }
      });
  return List.fold_left((function (sum, dx) {
                return List.fold_left((function (sum, dy) {
                              var param = [
                                dx,
                                dy
                              ];
                              return {
                                      hd: [
                                        p_0 + param[0],
                                        p_1 + param[1]
                                      ],
                                      tl: sum
                                    };
                            }), sum, d);
              }), /* [] */0, d);
}

function reducer(state, action) {
  if (typeof action === "number") {
    return {
            presed: false,
            pixels: /* [] */0
          };
  }
  switch (action.TAG | 0) {
    case /* MouseDown */0 :
        return {
                presed: true,
                pixels: Pervasives.$at(getOffset(action._0), state.pixels)
              };
    case /* MouseUp */1 :
        return {
                presed: false,
                pixels: state.pixels
              };
    case /* MouseMove */2 :
        if (state.presed) {
          return {
                  presed: true,
                  pixels: Pervasives.$at(getOffset(action._0), state.pixels)
                };
        } else {
          return state;
        }
    
  }
}

function persistEventAnd(e, fn) {
  e.persist();
  return Curry._1(fn, e);
}

function Canvas$Write(Props) {
  var dims = Props.dims;
  var onChangeOpt = Props.onChange;
  var onChange = onChangeOpt !== undefined ? onChangeOpt : (function (param) {
        
      });
  var match = React.useReducer(reducer, {
        presed: false,
        pixels: /* [] */0
      });
  var dispatch = match[1];
  var state = match[0];
  var canvasRef = useSyncCanvas((function (ctx, param) {
          return List.iter((function (p) {
                        return Stylus$ReasonReactExamples.draw_square(ctx, p, 100 / 28, undefined);
                      }), state.pixels);
        }), dims);
  React.useEffect((function () {
          var token = setTimeout((function (param) {
                  return Curry._1(onChange, state.pixels);
                }), 300);
          return (function (param) {
                    clearTimeout(token);
                    
                  });
        }), [state.pixels]);
  return React.createElement("div", undefined, React.createElement("canvas", {
                  ref: canvasRef,
                  height: String(dims[1]),
                  width: String(dims[0]),
                  onMouseDown: (function (e) {
                      return persistEventAnd(e, (function (e) {
                                    return Curry._1(dispatch, {
                                                TAG: /* MouseDown */0,
                                                _0: e
                                              });
                                  }));
                    }),
                  onMouseLeave: (function (e) {
                      return persistEventAnd(e, (function (e) {
                                    return Curry._1(dispatch, {
                                                TAG: /* MouseUp */1,
                                                _0: e
                                              });
                                  }));
                    }),
                  onMouseMove: (function (e) {
                      return persistEventAnd(e, (function (e) {
                                    return Curry._1(dispatch, {
                                                TAG: /* MouseMove */2,
                                                _0: e
                                              });
                                  }));
                    }),
                  onMouseUp: (function (e) {
                      return persistEventAnd(e, (function (e) {
                                    return Curry._1(dispatch, {
                                                TAG: /* MouseUp */1,
                                                _0: e
                                              });
                                  }));
                    })
                }), React.createElement("button", {
                  onClick: (function (param) {
                      return Curry._1(dispatch, /* Clear */0);
                    })
                }, "Clear"));
}

var Write = {
  noop: noop,
  getOffset: getOffset,
  reducer: reducer,
  persistEventAnd: persistEventAnd,
  make: Canvas$Write
};

var make = Canvas;

exports.apply_changes = apply_changes;
exports.scale = scale;
exports.useSyncCanvas = useSyncCanvas;
exports.make = make;
exports.Write = Write;
/* react Not a pure module */
