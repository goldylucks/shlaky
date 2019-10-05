"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint import/no-extraneous-dependencies: 0 */
class ErrorFallbackComponent extends _react.Component {
  render() {
    const {
      error,
      componentStack
    } = this.props;
    return _react.default.createElement("div", null, _react.default.createElement("p", null, _react.default.createElement("strong", null, "Oops! An error occured!")), _react.default.createElement("p", null, "Here\u2019s what we know\u2026"), _react.default.createElement("p", null, _react.default.createElement("strong", null, "Error:"), " ", error.toString()), _react.default.createElement("p", null, _react.default.createElement("strong", null, "Stacktrace:"), " ", componentStack));
  }

}

ErrorFallbackComponent.propTypes = {
  componentStack: _propTypes.default.string.isRequired,
  error: _propTypes.default.object.isRequired
};
var _default = ErrorFallbackComponent;
exports.default = _default;