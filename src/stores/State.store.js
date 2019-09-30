/* eslint-disable import/no-extraneous-dependencies */
import { extendObservable } from 'mobx'

import Store from './Store'

class StateStore extends Store {
  constructor({ config, dependencies, overrides }) {
    super({ config, dependencies, overrides })
    this.setup()
  }

  setup() {
    const { initial } = this.configState
    extendObservable(this, {
      value: initial,
    })
  }

  set = value => {
    this.validateValue(value)
    this.value = value
  }

  get = () => this.value

  is = value => this.value === value

  validateValue(value) {
    const { allowed } = this.configState
    if (!allowed) {
      return
    }

    if (allowed.includes(value)) {
      return
    }

    throw new Error(
      `[State ${this._name}] value ${value} is not in the allowed list:`,
      allowed
    )
  }

  get configState() {
    return this.config.states.find(state => state.key === this._name)
  }
}

export default StateStore
