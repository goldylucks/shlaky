"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _history = require("history");

var _mobx = require("mobx");

/* eslint import/no-extraneous-dependencies: 0 */
const history = (0, _history.createBrowserHistory)();
(0, _mobx.decorate)(history, {
  location: _mobx.observable
});
var _default = history;
exports.default = _default;