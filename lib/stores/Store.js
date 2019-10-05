"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mobx = require("mobx");

var _Base = _interopRequireDefault(require("../Base"));

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let Store = (_class = (_temp = class Store extends _Base.default {
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

    this.debug = (...args) => global.console.debug(`[${this._displayName}]`, ...args);

    Object.assign(this, {
      config
    }, dependencies, {
      overrides
    });
  }

  get _name() {
    return this.constructor.__name;
  }

  get _displayName() {
    return `${this._name} store`;
  }

}, _temp), (_applyDecoratedDescriptor(_class.prototype, "_name", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "_name"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_displayName", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "_displayName"), _class.prototype)), _class);
var _default = Store;
exports.default = _default;