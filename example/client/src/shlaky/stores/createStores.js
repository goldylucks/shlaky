/* eslint max-classes-per-file: 0 */

import AuthStore from './Auth.store'
import CurrentUserStore from './CurrentUser.store'
import ResourceStore from './Resource.store'
import StateStore from './State.store'

const createStores = ({ config, dependencies, overrides = {} }) => {
  const resourceStores = createResourceStores({ config, dependencies })
  const stateStores = createStateStores({ config, dependencies, overrides })
  const auth = new AuthStore({ config, dependencies, overrides })
  const stores = {
    ...resourceStores,
    ...stateStores,
    auth,
    ...overrides,
  }
  if (supportsCurrentUser(config)) {
    stores.currentUser = createCurrentUserStore({
      config,
      dependencies,
      overrides,
    })
  }
  return stores
}

export default createStores

function createResourceStores({ config, dependencies, overrides }) {
  return config.resources
    .map(({ key }) => {
      class DynamicResourceStore extends ResourceStore {
        static __name = key
      }
      const store = new DynamicResourceStore({
        config,
        dependencies,
        overrides,
      })
      return [key, store]
    })
    .reduce((acc, [key, store]) => {
      return { ...acc, [key]: store }
    }, {})
}

function createStateStores({ config, dependencies, overrides }) {
  return config.states
    .map(({ key }) => {
      class DynamicStateStore extends StateStore {
        static __name = key
      }
      const store = new DynamicStateStore({
        config,
        dependencies,
        overrides,
      })
      return [key, store]
    })
    .reduce((acc, [key, store]) => {
      return { ...acc, [key]: store }
    }, {})
}

function supportsCurrentUser(config) {
  return !!config.resources.find(resource => resource.key === 'users')
}

function createCurrentUserStore({ config, dependencies, overrides }) {
  return new CurrentUserStore({ config, dependencies, overrides })
}
