/* eslint-disable import/no-extraneous-dependencies */

import { extendObservable } from 'mobx'

import { Store } from '..'

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
    const { data, error } = await this.managers.api.auth.login(this.inputs)
    if (error) {
      throw new Error(error)
    }
    return data
  }

  login = async () => {
    const { data, error } = await this.managers.api.auth.login(this.inputs)
    if (error) {
      throw new Error(error)
    }
    return data
  }

  forgotPassword = async () => {
    const { error } = await this.managers.api.auth.forgotPassword(this.inputs)
    if (error) {
      throw new Error(error)
    }
    return true
  }
}

export default AuthStore
