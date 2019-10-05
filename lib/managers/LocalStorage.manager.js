"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Manager = _interopRequireDefault(require("./Manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CURRENT_USER = 'currentUser';

class LocalStorageManager extends _Manager.default {
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
    this.set = {};
    this.remove = {};

    this.setupKey = key => {
      this.set[key] = data => this._set(key, data);

      this.get[key] = () => this._get(key);

      this.remove[key] = () => this._remove(key);
    };

    this.debug = (...args) => global.console.debug('[Local storage]', ...args);

    this.reportError = (...args) => global.console.error('[Local storage] Error', ...args);

    this.setup();
  }

  setup() {
    this.config.localStorageKeys.forEach(this.setupKey);

    if (this.supportsCurrentUser) {
      this.setupKey(CURRENT_USER);
    }
  }

  _set(key, value) {
    this.debug(`Setting ${key}`, value);
    return localStorage.setItem(key, JSON.stringify(value));
  }

  _get(key) {
    const unparsed = localStorage.getItem(key);

    try {
      const parsed = JSON.parse(unparsed);
      this.debug(`Got ${key}`, parsed);
      return parsed;
    } catch (err) {
      this.reportError(`Parsing ${key}`, unparsed);
    }
  }

  _remove(key) {
    this.debug(`Removing ${key}`);
    localStorage.removeItem(key);
  }

}

var _default = LocalStorageManager;
exports.default = _default;