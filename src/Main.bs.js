'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var TodoApp$ReasonReactTodoList = require("./TodoApp.bs.js");

var root = document.querySelector("#root");

if (!(root == null)) {
  ReactDom.render(React.createElement(TodoApp$ReasonReactTodoList.make, {}), root);
}

/* root Not a pure module */
