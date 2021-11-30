'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var StartStop$ReasonReactExamples = require("./MachineLearning/UI/StartStop.bs.js");
var DetectDigits$ReasonReactExamples = require("./MachineLearning/Algorithms/DetectDigits.bs.js");
var ExampleStyles$ReasonReactExamples = require("./ExampleStyles.bs.js");
var LinearRegression$ReasonReactExamples = require("./MachineLearning/Algorithms/LinearRegression.bs.js");
var LogisticRegression$ReasonReactExamples = require("./MachineLearning/Algorithms/LogisticRegression.bs.js");

var createElement = (function(type) {
    return document.createElement(type);
  });

var appendToHead = (function(child) {
    return document.head.appendChild(child);
  });

var appendToBody = (function(child) {
    return document.body.appendChild(child);
  });

var appendToContainer = (function(container,child) {
    return container.appendChild(child);
  });

var style = createElement("style");

appendToHead(style);

style.innerHTML = ExampleStyles$ReasonReactExamples.style;

function makeContainer(text) {
  var container = createElement("div");
  container.className = "container";
  var title = createElement("div");
  title.className = "containerTitle";
  title.innerText = text;
  var content = createElement("div");
  content.className = "containerContent";
  appendToContainer(container, title);
  appendToContainer(container, content);
  appendToBody(container);
  return content;
}

ReactDom.render(React.createElement(DetectDigits$ReasonReactExamples.make, {}), makeContainer("NIST"));

ReactDom.render(React.createElement(StartStop$ReasonReactExamples.make, {
          children: React.createElement(LogisticRegression$ReasonReactExamples.make, {})
        }), makeContainer("Logistic Regression"));

ReactDom.render(React.createElement(StartStop$ReasonReactExamples.make, {
          children: React.createElement(LinearRegression$ReasonReactExamples.make, {})
        }), makeContainer("Linear Regression"));

exports.createElement = createElement;
exports.appendToHead = appendToHead;
exports.appendToBody = appendToBody;
exports.appendToContainer = appendToContainer;
exports.style = style;
exports.makeContainer = makeContainer;
/* style Not a pure module */
