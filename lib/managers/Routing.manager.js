"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mobx = require("mobx");

var _Manager = _interopRequireDefault(require("./Manager"));

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let RoutingManager = (_class = (_temp = class RoutingManager extends _Manager.default {
  constructor({
    config,
    dependencies,
    overrides
  }) {
    super({
      config,
      dependencies,
      overrides
    });
    this.get = {};
    this.is = {};
    this.to = {};

    this.setupRoute = route => {
      this.get[route] = () => `/${route}`;

      this.is[route] = (pathname = this.pathname) => pathname === `/${route}`;

      this.to[route] = () => this.utils.history.push(this.get[route]());
    };

    this.setup();
  }

  setup() {
    this.setupHomeRoute();
    this.setupResourcesRoutes();
    this.setupStatesRoutes();
    this.config.routes.forEach(this.setupRoute);

    if (this.supportsCurrentUser) {
      this.setupCurrentUser();
    }
  }

  back() {
    this.utils.history.goBack();
  }

  setupResourcesRoutes() {
    this.config.resources.map(resource => resource.key).forEach(this.setupRoute);
  }

  setupStatesRoutes() {
    this.config.states.map(state => state.key).forEach(this.setupRoute);
  }

  setupHomeRoute() {
    this.get.home = () => '/';

    this.is.home = (pathname = this.pathname) => pathname === '/';

    this.to.home = () => this.utils.history.push(this.get.home());
  }

  setupCurrentUser() {
    this.setupRoute('profile');
    this.setupRoute('login');
    this.setupRoute('signup');
    this.setupRoute('auth');
    this.setupRoute('forgotPassword');
  }

  get pathname() {
    return this.utils.history.location.pathname;
  }

}, _temp), (_applyDecoratedDescriptor(_class.prototype, "pathname", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "pathname"), _class.prototype)), _class);
var _default = RoutingManager;
exports.default = _default;