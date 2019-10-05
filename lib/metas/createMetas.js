"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Booting = _interopRequireDefault(require("./Booting.meta"));

var _Rendering = _interopRequireDefault(require("./Rendering.meta"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createMetas = ({
  config,
  dependencies,
  overrides = {}
}) => {
  const booting = new _Booting.default({
    dependencies,
    overrides,
    config
  });
  const rendering = new _Rendering.default({
    dependencies,
    overrides,
    config
  });
  return {
    booting,
    rendering
  };
};

var _default = createMetas;
exports.default = _default;