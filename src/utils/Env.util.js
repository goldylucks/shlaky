import { Util } from '../shlakyjs'

class EnvUtils extends Util {
  constructor(...args) {
    super(...args)
    this.reportEnv()
  }

  isDev = () => process.env.REACT_APP_ENV === 'development'

  isStaging = () => process.env.REACT_APP_ENV === 'staging'

  isProd = () => process.env.REACT_APP_ENV === 'production'

  reportEnv = () => global.console.debug(`[Env] ${process.env.REACT_APP_ENV}`)
}

export default EnvUtils
