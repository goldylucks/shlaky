/* eslint-disable import/no-extraneous-dependencies */

import { extendObservable } from 'mobx'

import Store from './Store'

class AuthStore extends Store {
  constructor(...args) {
    super(...args)
    this.setup()
  }

  inputs = {}

  get = fieldKey => this.inputs[fieldKey]

  set = (fieldKey, value) => {
    this.inputs[fieldKey] = value
  }

  reset = () =>
    this.inputs.forEach(fieldKey => {
      this.inputs[fieldKey] = ''
    })

  setup() {
    this.userFields.forEach(({ fieldKey }) => {
      extendObservable(this.inputs, { [fieldKey]: '' })
    })
  }

  signup = async () => {
    const {
      data: { user },
      error,
    } = await this.managers.api.auth.signup(this.inputs)
    if (error) {
      global.alert(error.message)
      global.console.error(error)
      return
    }
    this.managers.localStorage.set.currentUser(user)
    return user
  }

  login = async () => {
    const {
      data: { user },
      error,
    } = await this.managers.api.auth.login(this.inputs)
    if (error) {
      global.alert(error.message)
      global.console.error(error)
      return
    }
    this.managers.localStorage.set.currentUser(user)
    return user
  }

  forgotPassword = async () => {
    const { error } = await this.managers.api.auth.forgotPassword(this.inputs)
    if (error) {
      global.alert(error.message)
      global.console.error(error)
      return
    }
    return true
  }
}

export default AuthStore
