"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mobx = require("mobx");

var _Store = _interopRequireDefault(require("./Store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-extraneous-dependencies */
class AuthStore extends _Store.default {
  constructor(...args) {
    super(...args);
    this.inputs = {};

    this.get = fieldKey => this.inputs[fieldKey];

    this.set = (fieldKey, value) => {
      this.inputs[fieldKey] = value;
    };

    this.reset = () => this.inputs.forEach(fieldKey => {
      this.inputs[fieldKey] = '';
    });

    this.signup = async () => {
      const {
        data: {
          user
        },
        error
      } = await this.managers.api.auth.signup(this.inputs);

      if (error) {
        global.console.error(error);
        return;
      }

      return user;
    };

    this.login = async () => {
      const {
        data: {
          user
        },
        error
      } = await this.managers.api.auth.login(this.inputs);

      if (error) {
        global.alert(error.message);
        global.console.error(error);
        return;
      }

      this.managers.localStorage.set.currentUser(user);
      return user;
    };

    this.forgotPassword = async () => {
      const {
        error
      } = await this.managers.api.auth.forgotPassword(this.inputs);

      if (error) {
        global.alert(error.message);
        global.console.error(error);
        return;
      }

      return true;
    };

    this.setup();
  }

  setup() {
    this.userFields.forEach(({
      fieldKey
    }) => {
      (0, _mobx.extendObservable)(this.inputs, {
        [fieldKey]: ''
      });
    });
  }

}

var _default = AuthStore;
exports.default = _default;