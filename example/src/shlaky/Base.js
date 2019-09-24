class Base {
  get supportsCurrentUser() {
    return this.config.resources.find(({ key }) => key === 'users')
  }
}

export default Base
