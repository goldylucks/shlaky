"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preApi = _interopRequireDefault(require("./preApi.middlewares"));

var _Auth = _interopRequireDefault(require("./Auth.middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createMiddlewares = dependencies => {
  const auth = new _Auth.default(dependencies);
  return {
    preApi: _preApi.default,
    auth
  };
};

var _default = createMiddlewares;
exports.default = _default;