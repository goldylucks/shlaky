"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Util = _interopRequireDefault(require("./Util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EnvUtils extends _Util.default {
  constructor(...args) {
    super(...args);

    this.isDev = () => process.env.REACT_APP_ENV === 'development';

    this.isStaging = () => process.env.REACT_APP_ENV === 'staging';

    this.isProd = () => process.env.REACT_APP_ENV === 'production';

    this.reportEnv = () => global.console.debug(`[Env] ${process.env.REACT_APP_ENV}`);

    this.reportEnv();
  }

}

var _default = EnvUtils;
exports.default = _default;