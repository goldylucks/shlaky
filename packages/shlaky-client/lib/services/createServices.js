"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Resource = _interopRequireDefault(require("./Resource.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createServices = ({
  config,
  dependencies,
  overrides = {}
}) => {
  const resource = new _Resource.default({
    config,
    dependencies,
    overrides
  });
  return {
    resource,
    ...overrides
  };
};

var _default = createServices;
exports.default = _default;