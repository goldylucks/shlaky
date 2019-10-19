"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v5"));

var _Util = _interopRequireDefault(require("./Util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/no-extraneous-dependencies: 0 */
class MiscUtil extends _Util.default {
  constructor(...args) {
    super(...args);

    this.randomId = () => (0, _v.default)(this.config.domain, _v.default.DNS);
  }

}

var _default = MiscUtil;
exports.default = _default;