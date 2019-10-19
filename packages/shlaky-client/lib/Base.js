"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Base {
  get supportsCurrentUser() {
    return !!this.usersConfig;
  }

  get usersConfig() {
    return this.config.resources.find(({
      key
    }) => key === 'users');
  }

  get userFields() {
    return this.usersConfig.fields;
  }

}

var _default = Base;
exports.default = _default;