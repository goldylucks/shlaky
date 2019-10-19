"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _createConstants = _interopRequireDefault(require("./constants/createConstants"));

var _createConfig = _interopRequireDefault(require("./config/createConfig"));

var _createUtils = _interopRequireDefault(require("./utils/createUtils"));

var _createHelpers = _interopRequireDefault(require("./helpers/createHelpers"));

var _createModels = _interopRequireDefault(require("./models/createModels"));

var _createManagers = _interopRequireDefault(require("./managers/createManagers"));

var _createServices = _interopRequireDefault(require("./services/createServices"));

var _createMiddlewares = _interopRequireDefault(require("./middlewares/createMiddlewares"));

var _createControllers = _interopRequireDefault(require("./controllers/createControllers"));

var _createRouters = _interopRequireDefault(require("./routers/createRouters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const constants = (0, _createConstants.default)();
const config = (0, _createConfig.default)({
  constants
});
const utils = (0, _createUtils.default)({
  constants,
  config
});
const helpers = (0, _createHelpers.default)({
  constants,
  config,
  utils
});
const models = (0, _createModels.default)({
  constants,
  config,
  utils,
  helpers
});
const managers = (0, _createManagers.default)({
  constants,
  config,
  utils,
  helpers,
  models
});
const services = (0, _createServices.default)({
  constants,
  config,
  utils,
  helpers,
  models,
  managers
});
const middlewares = (0, _createMiddlewares.default)({
  constants,
  config,
  utils,
  helpers,
  models,
  managers,
  services
});
const controllers = (0, _createControllers.default)({
  constants,
  config,
  utils,
  helpers,
  models,
  managers,
  services
});
const routers = (0, _createRouters.default)({
  constants,
  config,
  utils,
  helpers,
  models,
  managers,
  services,
  middlewares,
  controllers
});
const app = (0, _express.default)();
app.disable('x-powered-by');
app.use(...middlewares.preApi);
app.use('/api', routers);

const start = async () => {
  try {
    await managers.db.connect();
    app.listen(config.port, () => {
      console.log(`Listening on ${config.port}`);
    });
  } catch (error) {
    console.error('Error starting app', error);
  }
};

var _default = start;
exports.default = _default;