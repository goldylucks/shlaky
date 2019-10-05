"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Meta = _interopRequireDefault(require("./Meta"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/no-extraneous-dependencies: 0 */
class BootingMeta extends _Meta.default {
  constructor(...args) {
    super(...args);

    this.handleRedirectUser = () => {
      if (this.managers.routing.is.auth()) {
        this.managers.routing.to.home();
      }
    };

    this.handleRedirectGuest = () => {
      this.managers.routing.to.auth();
    };
  }

  boot() {
    if (this.supportsCurrentUser) {
      this.handleCurrentUser();
    }

    global.console.debug('Boot successful');
    return Promise.resolve(true);
  }

  handleCurrentUser() {
    const user = this.stores.currentUser.hydrateUserFromLocalStorage();

    if (user) {
      this.managers.api.setCurrentUser(user);
      this.stores.currentUser.refresh();
      this.handleRedirectUser();
    }
  }

}

var _default = BootingMeta;
exports.default = _default;