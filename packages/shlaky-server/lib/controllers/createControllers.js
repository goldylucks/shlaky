"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Users = _interopRequireDefault(require("./Users.controller"));

var _Auth = _interopRequireDefault(require("./Auth.controller"));

var _Tasks = _interopRequireDefault(require("./Tasks.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createControllers = dependencies => {
  const users = new _Users.default(dependencies);
  const auth = new _Auth.default(dependencies);
  const tasks = new _Tasks.default(dependencies);
  return {
    users,
    auth,
    tasks
  };
};

var _default = createControllers;
exports.default = _default;