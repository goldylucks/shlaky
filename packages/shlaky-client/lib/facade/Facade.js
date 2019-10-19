"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mobx = require("mobx");

var _Base = _interopRequireDefault(require("../Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/no-extraneous-dependencies: 0 */
class Facade extends _Base.default {
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

    this.setupResource = ({
      key,
      add = {}
    }) => {
      const store = this.stores[key];
      this[key] = Object.assign(this[key] || {}, {
        populate: () => store.populate(),
        all: () => store.all(),
        one: id => store.one(id),
        destroy: id => store.destroy(id),
        update: (id, data) => store.update(id, data),
        add: data => store.add(this.buildAddData({
          data,
          add
        })).then(this.routeIfExists(add.onSuccessRoute)),
        isEmpty: () => store.isEmpty(),
        populateIsLoading: () => store.populateIsLoading(),
        populateIsLoaded: () => store.populateIsLoaded(),
        populateHasError: () => store.populateHasError(),
        addIsLoading: () => store.addIsLoading(),
        addIsLoaded: () => store.addIsLoaded(),
        addHasError: () => store.addHasError()
      });
    };

    this.setupResourceFields = ({
      key,
      fields
    }) => {
      this[key].set = {};
      this[key].get = {};
      this[key].toggle = {};
      fields.forEach(({
        fieldKey,
        type
      }) => this.setupResourceField({
        key,
        fieldKey,
        type
      }));
    };

    this.setupResourceField = ({
      key,
      fieldKey,
      type
    }) => {
      this[key].set[fieldKey] = (id, nextValue) => this.stores[key].update(id, {
        [fieldKey]: nextValue
      });

      this[key].get[fieldKey] = id => this.stores[key].one(id);

      if (type === 'bool') {
        this.setupResourceFieldBool({
          key,
          fieldKey
        });
        return;
      }
    };

    this.setupState = ({
      key
    }) => {
      this[key] = {
        get: () => this.stores[key].get(),
        set: value => this.stores[key].set(value),
        is: value => this.stores[key].is(value)
      };
    };

    this.setupComponentToHide = ({
      name,
      routesToHide
    }) => {
      (0, _mobx.extendObservable)(this, {
        [name]: {
          isHidden: () => routesToHide.some(route => {
            return this.managers.routing.is[route]();
          })
        }
      });
    };

    this.generateAuthFields = () => this.userFields.reduce((acc, {
      fieldKey
    }) => ({
      get: { ...acc.get,
        [fieldKey]: () => this.stores.auth.get(fieldKey)
      },
      set: { ...acc.set,
        [fieldKey]: evt => this.stores.auth.set(fieldKey, evt.target.value)
      }
    }), {
      get: {},
      set: {}
    });

    Object.assign(this, {
      config
    }, dependencies, {
      overrides
    });
    this.setup();
  }

  setup() {
    this.setupRoutes();
    this.setupStates();
    this.setupResources();
    this.setupComponentsToHide();

    if (this.supportsCurrentUser) {
      this.setupCurrentUser();
      this.setupAuth();
    }
  }

  setupResources() {
    this.config.resources.forEach(this.setupResource);
    this.config.resources.forEach(this.setupResourceFields);
  }

  setupResourceFieldBool({
    key,
    fieldKey
  }) {
    this[key].toggle[fieldKey] = id => {
      const item = this.stores[key].one(id);
      const nextValue = !item[fieldKey];
      this.stores[key].update(id, {
        [fieldKey]: nextValue
      });
    };
  }

  buildAddData({
    data,
    add
  }) {
    if (!add.data) {
      return data;
    }

    return add.data.reduce((acc, {
      name,
      value
    }) => ({ ...acc,
      [name]: this.stringOperator(value)
    }), data);
  }

  routeIfExists(route) {
    if (!route) {
      return;
    }

    this.routing.to[route]();
  }

  stringOperator(value) {
    const [key, field] = value.split('.');
    return this[key][field].value();
  }

  setupCurrentUser() {
    this.currentUser = {
      logout: () => this.stores.currentUser.logout(),
      refresh: () => this.stores.currentUser.refresh()
    };
  }

  setupAuth() {
    (0, _mobx.extendObservable)(this, {
      auth: { ...this.generateAuthFields(),
        signup: () => this.stores.auth.signup(),
        login: () => this.stores.auth.login(),
        forgotPassword: () => this.stores.auth.login()
      }
    });
  }

  setupRoutes() {
    this.routing = this.routing || {};
    this.routing.get = this.routing.get || {};
    this.routing.is = this.routing.is || {};
    this.routing.to = this.routing.to || {};
    this.routing.get = Object.assign(this.routing.get, this.managers.routing.get);
    this.routing.is = Object.assign(this.routing.is, this.managers.routing.is);
    this.routing.to = Object.assign(this.routing.to, this.managers.routing.to);
  }

  setupStates() {
    this.config.states.forEach(this.setupState);
  }

  setupComponentsToHide() {
    this.config.components.forEach(this.setupComponentToHide);
  }

}

var _default = Facade;
exports.default = _default;