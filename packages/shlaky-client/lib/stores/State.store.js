"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mobx = require("mobx");

var _Store = _interopRequireDefault(require("./Store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-extraneous-dependencies */
class StateStore extends _Store.default {
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

    this.set = value => {
      this.validateValue(value);
      this.value = value;
    };

    this.get = () => this.value;

    this.is = value => this.value === value;

    this.setup();
  }

  setup() {
    const {
      initial
    } = this.configState;
    (0, _mobx.extendObservable)(this, {
      value: initial
    });
  }

  validateValue(value) {
    const {
      allowed
    } = this.configState;

    if (!allowed) {
      return;
    }

    if (allowed.includes(value)) {
      return;
    }

    throw new Error(`[State ${this._name}] value ${value} is not in the allowed list:`, allowed);
  }

  get configState() {
    return this.config.states.find(state => state.key === this._name);
  }

}

var _default = StateStore;
exports.default = _default;