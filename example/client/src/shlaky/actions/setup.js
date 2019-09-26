import createMetas from '../metas/createMetas'
import createFacade from '../facade/createFacade'
import createStores from '../stores/createStores'
import createServices from '../services/createServices'
import createManagers from '../managers/createManagers'
import createHelpers from '../helpers/createHelpers'
import createUtils from '../utils/createUtils'
import createConstants from '../constants/createConstants'

const setup = ({ config, overrides, axios }) => {
  const dependencies = {}
  const constants = createConstants({ config, overrides })
  dependencies.constants = constants
  const utils = createUtils({ config, dependencies, overrides })
  dependencies.utils = utils
  const helpers = createHelpers({ config, dependencies, overrides })
  dependencies.helpers = helpers
  const managers = createManagers({ config, dependencies, overrides, axios })
  dependencies.managers = managers
  const services = createServices({ config, dependencies, overrides })
  dependencies.services = services
  const stores = createStores({ config, dependencies, overrides })
  dependencies.stores = stores
  const facade = createFacade({ config, dependencies, overrides })
  dependencies.facade = facade
  const metas = createMetas({ config, dependencies, overrides })
  return {
    constants,
    utils,
    helpers,
    managers,
    services,
    stores,
    facade,
    metas,
  }
}

export default setup
