"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Helper = _interopRequireDefault(require("./Helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EndpointsHelper extends _Helper.default {
  constructor(...args) {
    super(...args);

    this.setupResource = ({
      key
    }) => {
      this[key] = {
        add: () => `/${key}`,
        all: () => `/${key}`,
        one: id => `/${key}/${id}`,
        update: id => `/${key}/${id}`,
        destroy: id => `/${key}/${id}`
      };
    };

    this.setup();
  }

  setup() {
    this.config.resources.forEach(this.setupResource);

    if (this.supportsCurrentUser) {
      this.setupCurrentUser();
      this.setupAuth();
    }
  }

  setupCurrentUser() {
    this.currentUser = {
      me: () => '/users/me'
    };
  }

  setupAuth() {
    this.auth = {
      login: () => '/auth/login',
      signup: () => '/auth/signup',
      forgotPassword: () => '/auth/forgotPassword'
    };
  }

}

var _default = EndpointsHelper;
exports.default = _default;