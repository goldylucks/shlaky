"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Users = _interopRequireDefault(require("./Users.router"));

var _Auth = _interopRequireDefault(require("./Auth.router"));

var _Tasks = _interopRequireDefault(require("./Tasks.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();

const createRouters = dependencies => {
  const users = new _Users.default(dependencies);
  const auth = new _Auth.default(dependencies);
  const tasks = new _Tasks.default(dependencies);
  router.use('/users', users.getInstance());
  router.use('/auth', auth.getInstance());
  router.use('/tasks', tasks.getInstance());
  return router;
};

var _default = createRouters;
exports.default = _default;