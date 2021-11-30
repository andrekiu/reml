'use strict';


function draw_point(ctx, param, $staropt$star, param$1) {
  var color = $staropt$star !== undefined ? $staropt$star : "black";
  ctx.beginPath();
  ctx.arc(param[0], param[1], 1.0, 0.0, Math.acos(-1) * 2, false);
  ctx.fillStyle = color;
  ctx.fill();
  
}

function clear_canvas(ctx, param) {
  ctx.clearRect(0, 0, param[0], param[1]);
  
}

function draw_line(ctx, pts, colorOpt, param) {
  var color = colorOpt !== undefined ? colorOpt : "red";
  var loop = function (_pts) {
    while(true) {
      var pts = _pts;
      if (!pts) {
        return ;
      }
      var match = pts.tl;
      if (!match) {
        return ;
      }
      var s = match.hd;
      var f = pts.hd;
      ctx.moveTo(f[0], f[1]);
      ctx.lineTo(s[0], s[1]);
      _pts = {
        hd: s,
        tl: match.tl
      };
      continue ;
    };
  };
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  loop(pts);
  ctx.stroke();
  
}

function draw_square(ctx, p, side, density) {
  var color = "rgb(" + density + ", " + density + ", " + density + ")";
  ctx.fillStyle = color;
  ctx.fillRect(p[0], p[1], side, side);
  
}

exports.draw_point = draw_point;
exports.clear_canvas = clear_canvas;
exports.draw_line = draw_line;
exports.draw_square = draw_square;
/* No side effect */
