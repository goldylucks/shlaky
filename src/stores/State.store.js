/* eslint-disable no-underscore-dangle */
import { extendObservable } from 'mobx'

import Store from './Store'

class StateStore extends Store {
  constructor(dependencies) {
    super(dependencies)
    this.setup()
  }

  setup() {
    const { key, initial, allowed } = this.config.states[this._name]
    extendObservable(this, {
      [key]: initial,
    })
  }

  set = value => this[key] = value

  get = () => this[key]

  is = value => this[key] === value
}

export default StateStore
