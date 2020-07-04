'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var StartStop$ReasonReactExamples = require("./MachineLearning/UI/StartStop.bs.js");
var DetectDigits$ReasonReactExamples = require("./MachineLearning/Algorithms/DetectDigits.bs.js");
var ExampleStyles$ReasonReactExamples = require("./ExampleStyles.bs.js");
var LinearRegression$ReasonReactExamples = require("./MachineLearning/Algorithms/LinearRegression.bs.js");
var LogisticRegression$ReasonReactExamples = require("./MachineLearning/Algorithms/LogisticRegression.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$ReasonReactExamples.style;

function makeContainer(text) {
  var container = document.createElement("div");
  container.className = "container";
  var title = document.createElement("div");
  title.className = "containerTitle";
  title.innerText = text;
  var content = document.createElement("div");
  content.className = "containerContent";
  container.appendChild(title);
  container.appendChild(content);
  document.body.appendChild(container);
  return content;
}

ReactDom.render(React.createElement(DetectDigits$ReasonReactExamples.make, { }), makeContainer("NIST"));

ReactDom.render(React.createElement(StartStop$ReasonReactExamples.make, {
          children: React.createElement(LogisticRegression$ReasonReactExamples.make, { })
        }), makeContainer("Logistic Regression"));

ReactDom.render(React.createElement(StartStop$ReasonReactExamples.make, {
          children: React.createElement(LinearRegression$ReasonReactExamples.make, { })
        }), makeContainer("Linear Regression"));

exports.style = style;
exports.makeContainer = makeContainer;
/* style Not a pure module */
