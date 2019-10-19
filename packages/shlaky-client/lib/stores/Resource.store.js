"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mobx = require("mobx");

var _pluralize = _interopRequireDefault(require("pluralize"));

var _Store = _interopRequireDefault(require("./Store"));

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

const INITIAL = 'initial';
const LOADING = 'loading';
const ERROR = 'error';
const LOADED = 'loaded';
let ResourceStore = (_class = (_temp = class ResourceStore extends _Store.default {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_all", _descriptor, this);

    _initializerDefineProperty(this, "_item", _descriptor2, this);

    _initializerDefineProperty(this, "populateState", _descriptor3, this);

    _initializerDefineProperty(this, "populateError", _descriptor4, this);

    this.populate = (0, _mobx.action)(this.populateActionName, async () => {
      if (this.populateIsLoading()) {
        this.debug('ignoring populate request, one is already running');
        return;
      }

      this.debug('Populating');
      this._all = [];
      this.populateState = LOADING;
      this.populateError = '';
      const {
        data,
        error
      } = await this.services.resource[this._name].all();

      if (error) {
        this.populateState = ERROR;
        this.populateError = error;
        return error;
      }

      this.populateState = LOADED;
      const list = data[this.listKey];
      this.debug(list);
      this._all = list;
      return list;
    });
    this.add = (0, _mobx.action)(this.addActionName, async toAdd => {
      if (this.addIsLoading()) {
        this.debug('Ignoring add request, one is already running');
        return;
      }

      this.debug('Adding', toAdd);
      const optimisticId = this.utils.misc.randomId();
      const optimisticAdd = { ...toAdd,
        _id: optimisticId,
        optimisticId
      };
      this.addState = LOADING;
      this.addError = ''; // optimistic update

      this._all.push(optimisticAdd);

      const {
        data,
        errorMessage
      } = await this.services.resource[this._name].add(toAdd);

      if (errorMessage) {
        // revert optimistic update
        this._all = this._all.filter(item => item.optimisticId !== optimisticId);
        this.addState = ERROR;
        this.addError = errorMessage;
        return;
      }

      const itemFromServer = data[this.itemKey];
      this.debug('Added', itemFromServer); // replace optimistic update item with server response

      this._all = this._all.map(item => item.optimisticId === optimisticId ? itemFromServer : item);
      this.addState = LOADED;
      return itemFromServer;
    });
    this.destroy = (0, _mobx.action)(this.destroyActionName, async id => {
      this.debug(`Destroying ${this._name} ${id}`);

      const itemToDelete = this._all.find(item => item.id === id);

      const itemToDeleteIdx = this._all.findIndex(item => item.id === id); // optimistic update


      this._all = this._all.filter(item => item._id !== id);
      const {
        errorMessage
      } = await this.services.resource[this._name].destroy(id);

      if (errorMessage) {
        // revert optimistic update
        this._all.splice(itemToDeleteIdx, 0, itemToDelete);

        global.alert('error deleting');
        return;
      }

      this.debug(`Destroyed ${this._name} ${id}`);
    });
    this.update = (0, _mobx.action)(this.updateActionName, async (id, dataToUpdate) => {
      this.debug(`Updating ${this._name} ${id}`); // optimistic update

      const itemToUpdate = this._all.find(item => item._id === id);

      this._all = this._all.map(item => item._id === id ? { ...itemToUpdate,
        ...dataToUpdate
      } : item);
      const {
        data,
        errorMessage
      } = await this.services.resource[this._name].update(id, dataToUpdate);

      if (errorMessage) {
        // revert optimistic update
        this._all = this._all.map(item => item._id === id ? itemToUpdate : item);
        return;
      }

      const itemFromServer = data[this.itemKey]; // replace optimistic update item with server response

      this._all = this._all.map(item => item._id === id ? itemFromServer : item);
      this.debug('Updated');
      return itemFromServer;
    });

    this.all = () => this._all;

    this.one = id => this._all.find(item => item._id === id);

    this.populateIsLoading = () => this.populateState === LOADING;

    this.populateIsLoaded = () => this.populateState === LOADED;

    this.populateHasError = () => this.populateState === ERROR;

    this.isEmpty = () => this.populateIsLoaded() && !this._all.length;

    this.addIsLoading = () => this.addState === LOADING;

    this.addIsLoaded = () => this.addState === LOADED;

    this.addHasError = () => this.addState === ERROR;
  }

  get populateActionName() {
    return `${this._displayName} populate`;
  }

  get addActionName() {
    return `${this._displayName} add`;
  }

  get destroyActionName() {
    return `${this._displayName} destroy`;
  }

  get updateActionName() {
    return `${this._displayName} update`;
  }

  get listKey() {
    return this._name;
  }

  get itemKey() {
    return _pluralize.default.singular(this.listKey);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_all", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_item", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "populateState", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return INITIAL;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "populateError", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
})), _class);
var _default = ResourceStore;
exports.default = _default;