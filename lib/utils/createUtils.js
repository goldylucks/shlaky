"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _history = _interopRequireDefault(require("./history.util"));

var _Env = _interopRequireDefault(require("./Env.util"));

var _Misc = _interopRequireDefault(require("./Misc.util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUtils = ({
  config,
  dependencies,
  overrides = {}
}) => {
  const env = new _Env.default({
    config,
    dependencies,
    overrides
  });
  const misc = new _Misc.default({
    config,
    dependencies,
    overrides
  });
  return {
    history: _history.default,
    misc,
    env,
    ...overrides
  };
};

var _default = createUtils;
exports.default = _default;