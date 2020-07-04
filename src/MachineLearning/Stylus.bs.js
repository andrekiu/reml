'use strict';

var Webapi__Canvas__Canvas2d = require("bs-webapi/src/Webapi/Webapi__Canvas/Webapi__Canvas__Canvas2d.js");

function draw_point(ctx, param, $staropt$star, param$1) {
  var color = $staropt$star !== undefined ? $staropt$star : "black";
  ctx.beginPath();
  ctx.arc(param[0], param[1], 1.0, 0.0, Math.acos(-1) * 2, false);
  Webapi__Canvas__Canvas2d.setFillStyle(ctx, /* String */0, color);
  ctx.fill();
  return /* () */0;
}

function clear_canvas(ctx, param) {
  ctx.clearRect(0, 0, param[0], param[1]);
  return /* () */0;
}

function draw_line(ctx, pts, $staropt$star, param) {
  var color = $staropt$star !== undefined ? $staropt$star : "red";
  var loop = function (_pts) {
    while(true) {
      var pts = _pts;
      if (pts) {
        var match = pts[1];
        if (match) {
          var s = match[0];
          var f = pts[0];
          ctx.moveTo(f[0], f[1]);
          ctx.lineTo(s[0], s[1]);
          _pts = /* :: */[
            s,
            match[1]
          ];
          continue ;
        } else {
          return /* () */0;
        }
      } else {
        return /* () */0;
      }
    };
  };
  Webapi__Canvas__Canvas2d.setStrokeStyle(ctx, /* String */0, color);
  ctx.lineWidth = 1;
  ctx.beginPath();
  loop(pts);
  ctx.stroke();
  return /* () */0;
}

function draw_square(ctx, p, side, density) {
  var color = "rgb(" + (String(density) + (", " + (String(density) + (", " + (String(density) + ")")))));
  Webapi__Canvas__Canvas2d.setFillStyle(ctx, /* String */0, color);
  ctx.fillRect(p[0], p[1], side, side);
  return /* () */0;
}

exports.draw_point = draw_point;
exports.clear_canvas = clear_canvas;
exports.draw_line = draw_line;
exports.draw_square = draw_square;
/* No side effect */
