"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _setup = _interopRequireDefault(require("./setup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const start = (...args) => {
  const {
    metas,
    facade,
    utils
  } = (0, _setup.default)(...args);
  metas.booting.boot().then(metas.rendering.render);

  if (utils.env.isDev()) {
    global.facade = facade;
  }
};

var _default = start;
exports.default = _default;