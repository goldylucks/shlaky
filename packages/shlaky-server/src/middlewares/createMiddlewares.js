import preApi from './preApi.middlewares'
import Auth from './Auth.middleware'

const createMiddlewares = dependencies => {
  const auth = new Auth(dependencies)
  return {
    preApi,
    auth,
  }
}

export default createMiddlewares
