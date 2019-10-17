import createConstants from './constants/createConstants'
import createUtils from './utils/createUtils'
import createHelpers from './helpers/createHelpers'
import createManagers from './managers/createManagers'
import createServices from './services/createServices'
import createFacade from './facade/createFacade'

const constants = createConstants()
const utils = createUtils({ constants })
const helpers = createHelpers({ constants, utils })
const managers = createManagers({ constants, utils, helpers })
const services = createServices({ constants, utils, helpers, managers })
const facade = createFacade({ constants, utils, helpers, managers, services })

export default facade
