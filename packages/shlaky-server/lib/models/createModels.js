"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Users = _interopRequireDefault(require("./Users.model"));

var _Tasks = _interopRequireDefault(require("./Tasks.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createModels = dependencies => {
  const users = new _Users.default(dependencies);
  const tasks = new _Tasks.default(dependencies);
  return {
    users,
    tasks
  };
};

var _default = createModels;
exports.default = _default;