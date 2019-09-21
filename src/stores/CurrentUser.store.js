import { observable, action, extendObservable } from 'mobx'

import Store from './Store'

const INITIAL = 'initial'
const LOADING = 'loading'
const ERROR = 'error'
const LOADED = 'loaded'

class CurrentUserStore extends Store {
  static __name = 'currentUser'

  @observable processingCreateState = INITIAL

  @observable processingCreateError = ''

  @observable processingSettingState = INITIAL

  @observable processingSettingError = ''

  constructor(dependencies) {
    super(dependencies)
    this.setup()
  }

  setup() {
    extendObservable(this, {
      user: this.getPristineUser(),
    })
  }

  hydrateUserFromLocalStorage() {
    const user = this.managers.localStorage.getUser()
    if (user) {
      this.set(user)
      return user
    }
  }

  @action.bound
  async create({ name }) {
    this.processingCreateState = LOADING
    this.processingCreateError = ''
    const { error, data } = await this.services.resource.users.create({
      name,
    })
    if (error) {
      this.processingCreateState = ERROR
      this.processingCreateError = error.message
      return false
    }
    this.user = data.user
    this.processingCreateState = LOADED
    return true
  }

  @action.bound
  async updateField({ name, value }) {
    const currentValue = this.getField(name)
    const nextValue = value
    this.processingSettingState = LOADING
    this.processingSettingError = ''
    // optimistic update
    this.user[name] = nextValue
    const { error } = await this.services.resource.users.update(this.id, {
      [name]: nextValue,
    })
    if (error) {
      this.processingSettingState = ERROR
      this.processingSettingError = error.message
      // revert optimistic update
      this.user[name] = currentValue
      return false
    }
    this.processingSettingState = LOADED
    return true
  }

  @action.bound
  toggleField({ name }) {
    const currentValue = this.user[name]
    const nextValue = !currentValue
    return this.updateField({ name, value: nextValue })
  }

  getField(name) {
    return this.user[name]
  }

  @action.bound
  set(user) {
    this.user = user
    this.syncUserToLocalStorage()
    return user
  }

  @action.bound
  logout = () => {
    this.user = this.getPristineUser()
    this.managers.localStorage.removeUser()
  }

  syncUserToLocalStorage() {
    this.managers.localStorage.setUser(this.user)
  }

  getPristineUser() {
    return this.usersFields.reduce(
      (acc, { name, type }) => ({
        ...acc,
        [name]: this.getInitialValueForType(type),
      }),
      {}
    )
  }

  get usersFields() {
    return this.config.resources.find(resource => resource.name === 'users')
      .fields
  }

  getInitialValueForType(type) {
    if (type === 'string') {
      return ''
    }
    if (type === 'number') {
      return null
    }
    if (type === 'bool') {
      return false
    }
    global.console.error('type', type, 'is invalid')
  }
}

export default CurrentUserStore
