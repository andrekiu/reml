'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");
var Stylus$ReasonReactExamples = require("./Stylus.bs.js");

function apply_changes(canvasMaybe, fn) {
  if (canvasMaybe == null) {
    return /* () */0;
  } else {
    Curry._1(fn, canvasMaybe.getContext("2d"));
    return /* () */0;
  }
}

function scale(points, dims) {
  var dim_scale = function (v, limit) {
    var match = $$Array.fold_left((function (sum, e) {
            return /* tuple */[
                    Caml_primitive.caml_float_min(sum[0], e),
                    Caml_primitive.caml_float_max(sum[1], e)
                  ];
          }), /* tuple */[
          Caml_array.caml_array_get(v, 0),
          Caml_array.caml_array_get(v, 0)
        ], v);
    var high = match[1];
    var low = match[0];
    return /* tuple */[
            (function (e) {
                return (e - low) * limit / (high - low);
              }),
            /* tuple */[
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
  return /* tuple */[
          (function (p) {
              return /* tuple */[
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
                  return /* () */0;
                }));
          return ;
        }), /* tuple */[
        canvasRef,
        fn
      ]);
  return canvasRef;
}

function Canvas(Props) {
  var children = Props.children;
  var dims = Props.dims;
  Props.onChange;
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
  var p_000 = $$native.offsetX;
  var p_001 = $$native.offsetY;
  var d = List.map((function (prim) {
          return prim;
        }), /* :: */[
        0,
        /* :: */[
          -1,
          /* :: */[
            1,
            /* :: */[
              -2,
              /* :: */[
                2,
                /* [] */0
              ]
            ]
          ]
        ]
      ]);
  return List.fold_left((function (sum, dx) {
                return List.fold_left((function (sum, dy) {
                              var sum$1 = sum;
                              var param = /* tuple */[
                                dx,
                                dy
                              ];
                              return /* :: */[
                                      /* tuple */[
                                        p_000 + param[0],
                                        p_001 + param[1]
                                      ],
                                      sum$1
                                    ];
                            }), sum, d);
              }), /* [] */0, d);
}

function reducer(state, action) {
  if (typeof action === "number") {
    return {
            presed: false,
            pixels: /* [] */0
          };
  } else {
    switch (action.tag | 0) {
      case /* MouseDown */0 :
          return {
                  presed: true,
                  pixels: Pervasives.$at(getOffset(action[0]), state.pixels)
                };
      case /* MouseUp */1 :
          return {
                  presed: false,
                  pixels: state.pixels
                };
      case /* MouseMove */2 :
          var match = state.presed;
          if (match) {
            return {
                    presed: true,
                    pixels: Pervasives.$at(getOffset(action[0]), state.pixels)
                  };
          } else {
            return state;
          }
      
    }
  }
}

function persistEventAnd(e, fn) {
  e.persist();
  return Curry._1(fn, e);
}

function Canvas$Write(Props) {
  var dims = Props.dims;
  var match = Props.onChange;
  var onChange = match !== undefined ? match : (function (param) {
        return /* () */0;
      });
  var match$1 = React.useReducer(reducer, {
        presed: false,
        pixels: /* [] */0
      });
  var dispatch = match$1[1];
  var state = match$1[0];
  var canvasRef = useSyncCanvas((function (ctx, param) {
          return List.iter((function (p) {
                        return Stylus$ReasonReactExamples.draw_square(ctx, p, 100 / 28, /* () */0);
                      }), state.pixels);
        }), dims);
  React.useEffect((function () {
          var token = setTimeout((function (param) {
                  return Curry._1(onChange, state.pixels);
                }), 300);
          return (function (param) {
                    clearTimeout(token);
                    return /* () */0;
                  });
        }), /* array */[state.pixels]);
  return React.createElement("div", undefined, React.createElement("canvas", {
                  ref: canvasRef,
                  height: String(dims[1]),
                  width: String(dims[0]),
                  onMouseDown: (function (e) {
                      return persistEventAnd(e, (function (e) {
                                    return Curry._1(dispatch, /* MouseDown */Block.__(0, [e]));
                                  }));
                    }),
                  onMouseLeave: (function (e) {
                      return persistEventAnd(e, (function (e) {
                                    return Curry._1(dispatch, /* MouseUp */Block.__(1, [e]));
                                  }));
                    }),
                  onMouseMove: (function (e) {
                      return persistEventAnd(e, (function (e) {
                                    return Curry._1(dispatch, /* MouseMove */Block.__(2, [e]));
                                  }));
                    }),
                  onMouseUp: (function (e) {
                      return persistEventAnd(e, (function (e) {
                                    return Curry._1(dispatch, /* MouseUp */Block.__(1, [e]));
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
