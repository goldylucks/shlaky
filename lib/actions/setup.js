"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createMetas = _interopRequireDefault(require("../metas/createMetas"));

var _createFacade = _interopRequireDefault(require("../facade/createFacade"));

var _createStores = _interopRequireDefault(require("../stores/createStores"));

var _createServices = _interopRequireDefault(require("../services/createServices"));

var _createManagers = _interopRequireDefault(require("../managers/createManagers"));

var _createHelpers = _interopRequireDefault(require("../helpers/createHelpers"));

var _createUtils = _interopRequireDefault(require("../utils/createUtils"));

var _createConstants = _interopRequireDefault(require("../constants/createConstants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setup = ({
  config,
  overrides,
  axios
}) => {
  const dependencies = {};
  const constants = (0, _createConstants.default)({
    config,
    overrides
  });
  dependencies.constants = constants;
  const utils = (0, _createUtils.default)({
    config,
    dependencies,
    overrides
  });
  dependencies.utils = utils;
  const helpers = (0, _createHelpers.default)({
    config,
    dependencies,
    overrides
  });
  dependencies.helpers = helpers;
  const managers = (0, _createManagers.default)({
    config,
    dependencies,
    overrides,
    axios
  });
  dependencies.managers = managers;
  const services = (0, _createServices.default)({
    config,
    dependencies,
    overrides
  });
  dependencies.services = services;
  const stores = (0, _createStores.default)({
    config,
    dependencies,
    overrides
  });
  dependencies.stores = stores;
  const facade = (0, _createFacade.default)({
    config,
    dependencies,
    overrides
  });
  dependencies.facade = facade;
  const metas = (0, _createMetas.default)({
    config,
    dependencies,
    overrides
  });
  return {
    constants,
    utils,
    helpers,
    managers,
    services,
    stores,
    facade,
    metas
  };
};

var _default = setup;
exports.default = _default;