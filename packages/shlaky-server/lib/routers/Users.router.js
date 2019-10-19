"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Router = _interopRequireDefault(require("./Router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRouter extends _Router.default {
  setupInstance() {
    this.instance = (0, _express.Router)();
    this.instance.get('/', this.controllers.users.getMany);
    this.instance.get('/me', this.middlewares.auth.protect, this.controllers.users.me);
    this.instance.get('/:id', this.controllers.users.getOne);
  }

}

var _default = UsersRouter;
exports.default = _default;