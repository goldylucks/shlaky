"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Auth = _interopRequireDefault(require("./Auth.store"));

var _CurrentUser = _interopRequireDefault(require("./CurrentUser.store"));

var _Resource = _interopRequireDefault(require("./Resource.store"));

var _State = _interopRequireDefault(require("./State.store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint max-classes-per-file: 0 */
const createStores = ({
  config,
  dependencies,
  overrides = {}
}) => {
  const resourceStores = createResourceStores({
    config,
    dependencies
  });
  const stateStores = createStateStores({
    config,
    dependencies,
    overrides
  });
  const auth = new _Auth.default({
    config,
    dependencies,
    overrides
  });
  const stores = { ...resourceStores,
    ...stateStores,
    auth,
    ...overrides
  };

  if (supportsCurrentUser(config)) {
    stores.currentUser = createCurrentUserStore({
      config,
      dependencies,
      overrides
    });
  }

  return stores;
};

var _default = createStores;
exports.default = _default;

function createResourceStores({
  config,
  dependencies,
  overrides
}) {
  return config.resources.map(({
    key
  }) => {
    class DynamicResourceStore extends _Resource.default {}

    DynamicResourceStore.__name = key;
    const store = new DynamicResourceStore({
      config,
      dependencies,
      overrides
    });
    return [key, store];
  }).reduce((acc, [key, store]) => {
    return { ...acc,
      [key]: store
    };
  }, {});
}

function createStateStores({
  config,
  dependencies,
  overrides
}) {
  return config.states.map(({
    key
  }) => {
    class DynamicStateStore extends _State.default {}

    DynamicStateStore.__name = key;
    const store = new DynamicStateStore({
      config,
      dependencies,
      overrides
    });
    return [key, store];
  }).reduce((acc, [key, store]) => {
    return { ...acc,
      [key]: store
    };
  }, {});
}

function supportsCurrentUser(config) {
  return !!config.resources.find(resource => resource.key === 'users');
}

function createCurrentUserStore({
  config,
  dependencies,
  overrides
}) {
  return new _CurrentUser.default({
    config,
    dependencies,
    overrides
  });
}