"use strict";

var _react = _interopRequireDefault(require("react"));

var _mobxLogger = _interopRequireDefault(require("mobx-logger"));

var _whyDidYouRender = _interopRequireDefault(require("@welldone-software/why-did-you-render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/no-extraneous-dependencies: 0 */
// eslint-disable-next-line import/no-extraneous-dependencies
// const SHOW_MOBX_LOGS = true // change to true for debugging
// const SHOW_WHY_DID_YOU_RENDER = true // change to true for debugging
if (typeof SHOW_MOBX_LOGS !== 'undefined') {
  (0, _mobxLogger.default)();
}

if (typeof SHOW_WHY_DID_YOU_RENDER !== 'undefined') {
  (0, _whyDidYouRender.default)(_react.default);
  _react.default.Component.whyDidYouRender = true;
}