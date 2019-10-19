"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Facade = _interopRequireDefault(require("./Facade"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createFacade = ({
  dependencies,
  overrides = {},
  config
}) => {
  const facade = new _Facade.default({
    dependencies,
    overrides,
    config
  });
  return facade;
};

var _default = createFacade;
exports.default = _default;