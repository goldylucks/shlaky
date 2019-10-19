"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mobx = require("mobx");

var _Store = _interopRequireDefault(require("./Store"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

const INITIAL = 'initial';
const LOADING = 'loading';
const ERROR = 'error';
const LOADED = 'loaded';
let CurrentUserStore = (_dec = _mobx.action.bound, _dec2 = _mobx.action.bound, _dec3 = _mobx.action.bound, _dec4 = _mobx.action.bound, _dec5 = _mobx.action.bound, (_class = (_temp = _class2 = class CurrentUserStore extends _Store.default {
  constructor(dependencies) {
    super(dependencies);

    _initializerDefineProperty(this, "processingCreateState", _descriptor, this);

    _initializerDefineProperty(this, "processingCreateError", _descriptor2, this);

    _initializerDefineProperty(this, "processingSettingState", _descriptor3, this);

    _initializerDefineProperty(this, "processingSettingError", _descriptor4, this);

    _initializerDefineProperty(this, "logout", _descriptor5, this);

    this.setup();
  }

  setup() {
    (0, _mobx.extendObservable)(this, {
      user: this.getPristineUser()
    });
  }

  hydrateUserFromLocalStorage() {
    const user = this.managers.localStorage.get.currentUser();

    if (user) {
      this.set(user);
      return user;
    }
  }

  async refresh() {
    const {
      data: {
        user
      },
      error
    } = await this.managers.api.currentUser.refresh();

    if (error) {
      global.console.error('[currentUser.refresh]', error);
      return;
    }

    this.managers.localStorage.set.currentUser(user);
  }

  async create(user) {
    this.processingCreateState = LOADING;
    this.processingCreateError = '';
    const {
      error,
      data
    } = await this.services.resource.users.create(user);

    if (error) {
      this.processingCreateState = ERROR;
      this.processingCreateError = error.message;
      return false;
    }

    this.user = data.user;
    this.processingCreateState = LOADED;
    return true;
  }

  async updateField({
    name,
    value
  }) {
    const currentValue = this.getField(name);
    const nextValue = value;
    this.processingSettingState = LOADING;
    this.processingSettingError = ''; // optimistic update

    this.user[name] = nextValue;
    const {
      error
    } = await this.services.resource.users.update(this.id, {
      [name]: nextValue
    });

    if (error) {
      this.processingSettingState = ERROR;
      this.processingSettingError = error.message; // revert optimistic update

      this.user[name] = currentValue;
      return false;
    }

    this.processingSettingState = LOADED;
    return true;
  }

  toggleField({
    name
  }) {
    const currentValue = this.user[name];
    const nextValue = !currentValue;
    return this.updateField({
      name,
      value: nextValue
    });
  }

  getField(name) {
    return this.user[name];
  }

  set(user) {
    this.user = user;
    this.syncUserToLocalStorage();
    return user;
  }

  syncUserToLocalStorage() {
    this.managers.localStorage.set.currentUser(this.user);
  }

  getPristineUser() {
    return this.userFields.reduce((acc, {
      fieldKey,
      type
    }) => ({ ...acc,
      [fieldKey]: this.getInitialValueForType(type)
    }), {});
  }

  getInitialValueForType(type) {
    if (type.match(/string|password|enum/)) {
      return '';
    }

    if (type === 'number') {
      return null;
    }

    if (type === 'bool') {
      return false;
    }

    global.console.error('type', type, 'is invalid');
  }

}, _class2.__name = 'currentUser', _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "processingCreateState", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return INITIAL;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "processingCreateError", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "processingSettingState", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return INITIAL;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "processingSettingError", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _applyDecoratedDescriptor(_class.prototype, "create", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "create"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateField", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "updateField"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleField", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "toggleField"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "set", [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, "set"), _class.prototype), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "logout", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return () => {
      this.user = this.getPristineUser();
      this.managers.localStorage.remove.currentUser();
    };
  }
})), _class));
var _default = CurrentUserStore;
exports.default = _default;