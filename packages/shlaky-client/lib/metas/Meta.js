"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Base = _interopRequireDefault(require("../Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Meta extends _Base.default {
  constructor({
    config,
    dependencies,
    overrides
  }) {
    super({
      config,
      dependencies,
      overrides
    });
    Object.assign(this, {
      config
    }, dependencies, {
      overrides
    });
  }

}

var _default = Meta;
exports.default = _default;