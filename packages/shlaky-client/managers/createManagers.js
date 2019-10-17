import ApiManager from './Api.manager'
import LocalStorageManager from './LocalStorage.manager'
import RoutingManager from './Routing.manager'

const createManagers = ({ config, dependencies, overrides = {}, axios }) => {
  const api = new ApiManager({ config, dependencies, overrides, axios })
  const localStorage = new LocalStorageManager({
    config,
    dependencies,
    overrides,
  })
  const routing = new RoutingManager({ config, dependencies, overrides })
  return {
    api,
    localStorage,
    routing,
    ...overrides,
  }
}

export default createManagers
