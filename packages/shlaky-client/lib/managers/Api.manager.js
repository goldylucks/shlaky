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

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';
let ApiManager = (_class = (_temp = class ApiManager extends _Manager.default {
  constructor({
    axios,
    ...args
  }) {
    super({ ...args
    });

    this.setupResource = resource => {
      const {
        key
      } = resource;
      this[key] = this[key] || {};
      this.setupBasicCrud(key);

      if (key === 'users') {
        this.setupCurrentUser();
        this.setupAuth();
      }
    };

    this.setupCurrentUser = () => {
      this.currentUser = this.currentUser || {};

      this.currentUser.refresh = () => {
        const path = this.helpers.endpoints.currentUser.me();
        const url = this.buildUrl(path);
        return this.get(url);
      };
    };

    this.setupBasicCrud = key => {
      this[key] = this[key] || {};

      this[key].add = data => {
        const path = this.helpers.endpoints[key].add();
        const url = this.buildUrl(path);
        return this.post(url, data);
      };

      this[key].all = () => {
        const path = this.helpers.endpoints[key].all();
        const url = this.buildUrl(path);
        return this.get(url);
      };

      this[key].one = id => {
        const path = this.helpers.endpoints[key].one(id);
        const url = this.buildUrl(path);
        return this.get(url);
      };

      this[key].update = (id, data) => {
        const path = this.helpers.endpoints[key].update(id);
        const url = this.buildUrl(path);
        return this.put(url, data);
      };

      this[key].destroy = id => {
        const path = this.helpers.endpoints[key].destroy(id);
        const url = this.buildUrl(path);
        return this.delete(url);
      };
    };

    this.setCurrentUser = user => {
      this.debug('Setting current user', user);
      this.currentUserToken = user.token;
      return user;
    };

    this.formatErrorResponse = error => ({
      errorMessage: error.message,
      error,
      data: {} // make it safe for consumers to destructure the response before knowing if it's successful

    });

    this.axios = axios;
    this.setup();
  }

  setup() {
    this.config.resources.forEach(this.setupResource);
  }

  setupAuth() {
    this.auth = {
      signup: data => {
        const path = this.helpers.endpoints.auth.signup();
        const url = this.buildUrl(path);
        return this.post(url, data);
      },
      login: data => {
        const path = this.helpers.endpoints.auth.login();
        const url = this.buildUrl(path);
        return this.post(url, data);
      },
      forgotPassword: data => {
        const path = this.helpers.endpoints.auth.forgotPassword();
        const url = this.buildUrl(path);
        return this.post(url, data);
      }
    };
  }

  get baseUrl() {
    return '/api';
  }
  /* ************************************* /
  * Requests abstractions
  /************************************** */
  // eslint-disable-next-line max-params


  get(url, data = {}, config = {}) {
    return this.request({
      method: GET,
      url,
      data,
      config
    });
  } // eslint-disable-next-line max-params


  post(url, data = {}, config = {}) {
    return this.request({
      method: POST,
      url,
      data,
      config
    });
  } // eslint-disable-next-line max-params


  put(url, data = {}, config = {}) {
    return this.request({
      method: PUT,
      url,
      data,
      config
    });
  } // eslint-disable-next-line max-params


  delete(url, data = {}, config = {}) {
    return this.request({
      method: DELETE,
      url,
      data,
      config
    });
  }

  request({
    method,
    url,
    data,
    config
  }) {
    return this.axios({
      method,
      url,
      data,
      headers: this.headers,
      ...config
    }).then(this.helpers.apiValidations.registerValidateResponseFor({
      url,
      data,
      config
    })).catch(this.formatErrorResponse);
  }
  /* ************************************* /
  * MISC
  /************************************** */


  get headers() {
    const headers = {};

    if (this.currentUserToken) {
      headers.Authorization = `Bearer ${this.currentUserToken}`;
    }

    return headers;
  }

  buildUrl(path) {
    return this.baseUrl + path;
  }

  debug(...args) {
    global.console.debug('[API Manager]', ...args);
  }

}, _temp), (_applyDecoratedDescriptor(_class.prototype, "baseUrl", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "baseUrl"), _class.prototype)), _class);
var _default = ApiManager;
exports.default = _default;