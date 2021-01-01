'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function str(prim) {
  return prim;
}

function TodoApp$TodoItem(Props) {
  var item = Props.item;
  var onToggle = Props.onToggle;
  return React.createElement("div", {
              className: "item",
              onClick: (function (_e) {
                  return Curry._1(onToggle, undefined);
                })
            }, React.createElement("input", {
                  checked: item.completed,
                  type: "checkbox"
                }), item.title);
}

var TodoItem = {
  make: TodoApp$TodoItem
};

function valueFromEvent(e) {
  return e.target.value;
}

function TodoApp$Input(Props) {
  var onSubmit = Props.onSubmit;
  var match = React.useReducer((function (param, newText) {
          return newText;
        }), "");
  var setText = match[1];
  var text = match[0];
  return React.createElement("input", {
              placeholder: "Write a to-do here",
              type: "text",
              value: text,
              onKeyDown: (function (e) {
                  if (e.key === "Enter") {
                    Curry._1(onSubmit, text);
                    return Curry._1(setText, "");
                  }
                  
                }),
              onChange: (function (e) {
                  return Curry._1(setText, e.target.value);
                })
            });
}

var Input = {
  make: TodoApp$Input
};

var lastId = {
  contents: 0
};

function newItem(text) {
  lastId.contents = lastId.contents + 1 | 0;
  return {
          id: lastId.contents,
          title: text,
          completed: false
        };
}

function TodoApp(Props) {
  var match = React.useReducer((function (state, action) {
          if (!action.TAG) {
            return {
                    items: {
                      hd: newItem(action._0),
                      tl: state.items
                    }
                  };
          }
          var id = action._0;
          var items = List.map((function (item) {
                  if (item.id === id) {
                    return {
                            id: item.id,
                            title: item.title,
                            completed: !item.completed
                          };
                  } else {
                    return item;
                  }
                }), state.items);
          return {
                  items: items
                };
        }), {
        items: {
          hd: {
            id: 0,
            title: "Write a to-do",
            completed: false
          },
          tl: /* [] */0
        }
      });
  var dispatch = match[1];
  var items = match[0].items;
  var numItems = List.length(items);
  return React.createElement("div", {
              className: "app"
            }, React.createElement("div", {
                  className: "title"
                }, "What to do", React.createElement(TodoApp$Input, {
                      onSubmit: (function (text) {
                          return Curry._1(dispatch, {
                                      TAG: /* AddItem */0,
                                      _0: text
                                    });
                        })
                    })), React.createElement("div", {
                  className: "items"
                }, $$Array.of_list(List.map((function (item) {
                            return React.createElement(TodoApp$TodoItem, {
                                        item: item,
                                        onToggle: (function (param) {
                                            return Curry._1(dispatch, {
                                                        TAG: /* ToggleItem */1,
                                                        _0: item.id
                                                      });
                                          }),
                                        key: String(item.id)
                                      });
                          }), items))), React.createElement("div", {
                  className: "footer"
                }, String(numItems) + " items"));
}

var make = TodoApp;

exports.str = str;
exports.TodoItem = TodoItem;
exports.valueFromEvent = valueFromEvent;
exports.Input = Input;
exports.lastId = lastId;
exports.newItem = newItem;
exports.make = make;
/* react Not a pure module */
