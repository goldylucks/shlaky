class Base {
  get supportsCurrentUser() {
    return !!this.usersConfig
  }

  get usersConfig() {
    return this.config.resources.find(({ key }) => key === 'users')
  }

  get userFields() {
    return this.usersConfig.fields
  }
}

export default Base
