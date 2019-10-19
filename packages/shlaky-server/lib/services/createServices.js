"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Resource = _interopRequireDefault(require("./Resource.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createServices = dependencies => {
  const resource = new _Resource.default(dependencies);
  return {
    resource
  };
};

var _default = createServices;
exports.default = _default;