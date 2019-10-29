/* eslint import/no-extraneous-dependencies: 0 */

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
    const user = this.managers.localStorage.get.currentUser()
    if (user) {
      this.set(user)
      return user
    }
  }

  async refresh() {
    const {
      data: { user },
      error,
    } = await this.managers.api.currentUser.refresh()
    if (error) {
      global.console.error('[currentUser.refresh]', error)
      return
    }
    this.managers.localStorage.set.currentUser(user)
  }

  @action.bound
  async create(user) {
    this.processingCreateState = LOADING
    this.processingCreateError = ''
    const { error, data } = await this.services.resource.users.create(user)
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
    this.managers.localStorage.remove.currentUser()
  }

  syncUserToLocalStorage() {
    this.managers.localStorage.set.currentUser(this.user)
  }

  getPristineUser() {
    return this.userFields.reduce(
      (acc, { fieldKey, type }) => ({
        ...acc,
        [fieldKey]: this.getInitialValueForType(type),
      }),
      {}
    )
  }

  getInitialValueForType(type) {
    if (type.match(/string|password|enum/)) {
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

  isLoggedIn() {
    return !!this.id
  }

  get id() {
    return this.user._id
  }

  get() {
    return this.user
  }
}

export default CurrentUserStore
