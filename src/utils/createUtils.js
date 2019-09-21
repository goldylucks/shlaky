import historyUtil from './history.util'
import EnvUtil from './Env.util'
import MiscUtil from './Misc.util'

const createUtils = dependencies => {
  const env = new EnvUtil(dependencies)
  const misc = new MiscUtil(dependencies)
  return {
    history: historyUtil,
    misc,
    env,
  }
}

export default createUtils
