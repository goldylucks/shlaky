import historyUtil from './history.util'
import EnvUtil from './Env.util'
import MiscUtil from './Misc.util'

const createUtils = ({ config, dependencies, overrides = {} }) => {
  const env = new EnvUtil({ config, dependencies, overrides })
  const misc = new MiscUtil({ config, dependencies, overrides })
  return {
    history: historyUtil,
    misc,
    env,
    ...overrides,
  }
}

export default createUtils
