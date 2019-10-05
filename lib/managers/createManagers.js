"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Api = _interopRequireDefault(require("./Api.manager"));

var _LocalStorage = _interopRequireDefault(require("./LocalStorage.manager"));

var _Routing = _interopRequireDefault(require("./Routing.manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createManagers = ({
  config,
  dependencies,
  overrides = {},
  axios
}) => {
  const api = new _Api.default({
    config,
    dependencies,
    overrides,
    axios
  });
  const localStorage = new _LocalStorage.default({
    config,
    dependencies,
    overrides
  });
  const routing = new _Routing.default({
    config,
    dependencies,
    overrides
  });
  return {
    api,
    localStorage,
    routing,
    ...overrides
  };
};

var _default = createManagers;
exports.default = _default;