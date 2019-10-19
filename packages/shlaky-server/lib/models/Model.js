"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Base = _interopRequireDefault(require("../Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Model extends _Base.default {
  getInstance() {
    if (!this.instance) {
      this.setupInstance();
    }

    return this.instance;
  }

}

var _default = Model;
exports.default = _default;