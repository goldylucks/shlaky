"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Router = _interopRequireDefault(require("./Router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthRouter extends _Router.default {
  setupInstance() {
    this.instance = (0, _express.Router)();
    this.instance.post('/login', this.controllers.auth.login);
    this.instance.post('/signup', this.controllers.auth.signup);
  }

}

var _default = AuthRouter;
exports.default = _default;