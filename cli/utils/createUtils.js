import StringUtil from './String.util'

const createUtils = dependencies => {
  const string = new StringUtil(dependencies)
  return {
    string,
  }
}

export default createUtils
