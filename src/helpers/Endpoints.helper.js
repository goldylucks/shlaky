import Helper from './Helper'

class EndpointsHelper extends Helper {
  constructor(...args) {
    super(...args)
    this.setup()
  }

  setup() {
    this.config.resources.forEach(this.setupResource)
    if (this.supportsCurrentUser) {
      this.setupCurrentUser()
      this.setupAuth()
    }
  }

  setupResource = ({ key }) => {
    this[key] = {
      add: () => `/${key}`,
      all: () => `/${key}`,
      one: id => `/${key}/${id}`,
      update: id => `/${key}/${id}`,
      destroy: id => `/${key}/${id}`,
    }
  }

  setupCurrentUser() {
    this.currentUser = {
      me: () => '/users/me',
    }
  }

  setupAuth() {
    this.auth = {
      login: () => '/auth/login',
      signup: () => '/auth/signup',
      forgotPassword: () => '/auth/forgotPassword',
    }
  }
}

export default EndpointsHelper
