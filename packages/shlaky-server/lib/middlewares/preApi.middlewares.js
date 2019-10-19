"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bodyParser = require("body-parser");

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const preApiMiddlewares = [(0, _cors.default)(), (0, _bodyParser.json)(), (0, _bodyParser.urlencoded)({
  extended: true
}), (0, _morgan.default)('dev')];
var _default = preApiMiddlewares;
exports.default = _default;