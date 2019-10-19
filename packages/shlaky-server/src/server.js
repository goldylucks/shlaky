import express from 'express'

import createConstants from './constants/createConstants'
import createConfig from './config/createConfig'
import createUtils from './utils/createUtils'
import createHelpers from './helpers/createHelpers'
import createModels from './models/createModels'
import createManagers from './managers/createManagers'
import createServices from './services/createServices'
import createMiddlewares from './middlewares/createMiddlewares'
import createControllers from './controllers/createControllers'
import createRouters from './routers/createRouters'

const constants = createConstants()
const config = createConfig({ constants })
const utils = createUtils({ constants, config })
const helpers = createHelpers({ constants, config, utils })
const models = createModels({ constants, config, utils, helpers })
const managers = createManagers({ constants, config, utils, helpers, models })
const services = createServices({
  constants,
  config,
  utils,
  helpers,
  models,
  managers,
})
const middlewares = createMiddlewares({
  constants,
  config,
  utils,
  helpers,
  models,
  managers,
  services,
})
const controllers = createControllers({
  constants,
  config,
  utils,
  helpers,
  models,
  managers,
  services,
})
const routers = createRouters({
  constants,
  config,
  utils,
  helpers,
  models,
  managers,
  services,
  middlewares,
  controllers,
})

const app = express()
app.disable('x-powered-by')
app.use(...middlewares.preApi)
app.use('/api', routers)

const start = async () => {
  try {
    await managers.db.connect()
    app.listen(config.port, () => {
      console.log(`Listening on ${config.port}`)
    })
  } catch (error) {
    console.error('Error starting app', error)
  }
}

export default start
