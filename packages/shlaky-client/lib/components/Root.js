"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mobxReact = require("mobx-react");

var _facadeContext = _interopRequireDefault(require("../facade/facadeContext"));

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Root = (0, _mobxReact.observer)(_class = class Root extends _react.default.Component {
  render() {
    const {
      facade,
      facadeInstaceId,
      App
    } = this.props;
    return _react.default.createElement(_facadeContext.default.Provider, {
      value: facade,
      facadeInstaceId: facadeInstaceId
    }, _react.default.createElement(App, null));
  }

}) || _class;

Root.propTypes = {
  facade: _propTypes.default.object.isRequired,
  facadeInstaceId: _propTypes.default.number.isRequired,
  App: _propTypes.default.any.isRequired
};
var _default = Root;
exports.default = _default;