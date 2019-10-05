"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Helper = _interopRequireDefault(require("./Helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiValidationsHelper extends _Helper.default {
  constructor(...args) {
    super(...args);

    this.registerValidateResponseFor = ({
      url,
      data,
      config
    } = {}) => response => {
      if (!this.isBadResponse(response)) {
        global.console.debug('[API] response', response);
        return response;
      }

      this.reportBadResponse({
        url,
        data,
        config,
        response
      });
      throw new Error('bad response from API');
    };
  }

  isBadResponse(response) {
    return !response || response.data === undefined || response.data === null || Number.isNaN(response.data);
  }

  reportBadResponse({
    url,
    data,
    config,
    response
  }) {
    window.console.group('[API]: bad response');
    window.console.error('url:', url, '\n', 'data', data, '\n', 'config', config, '\n', 'response', response);
    window.console.groupEnd();
  }

  reportError({
    url,
    config,
    error
  }) {
    window.console.group('[API]: error');
    window.console.error('url:', url, '\n', 'config', config, '\n', 'error', error);
    window.console.groupEnd();
  }

}

var _default = ApiValidationsHelper;
exports.default = _default;