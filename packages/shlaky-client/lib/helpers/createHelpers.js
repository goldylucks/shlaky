"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Endpoints = _interopRequireDefault(require("./Endpoints.helper"));

var _ApiValidations = _interopRequireDefault(require("./ApiValidations.helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createHelpers = ({
  config,
  dependencies,
  overrides = {}
}) => {
  const endpoints = new _Endpoints.default({
    config,
    dependencies,
    overrides
  });
  const apiValidations = new _ApiValidations.default({
    config,
    dependencies,
    overrides
  });
  return {
    endpoints,
    apiValidations,
    ...overrides
  };
};

var _default = createHelpers;
exports.default = _default;