"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Auth = _interopRequireDefault(require("./Auth.util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUtils = dependencies => {
  const auth = new _Auth.default(dependencies);
  return {
    auth
  };
};

var _default = createUtils;
exports.default = _default;