import AuthUtil from './Auth.util'

const createUtils = dependencies => {
  const auth = new AuthUtil(dependencies)

  return {
    auth,
  }
}

export default createUtils
