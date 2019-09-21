import { computed } from 'mobx'

/* eslint-disable no-underscore-dangle */

class Store {
  constructor({ config, utils, helpers, managers, services }) {
    this.config = config
    this.utils = utils
    this.helpers = helpers
    this.managers = managers
    this.services = services
  }

  @computed
  get _name() {
    return this.constructor.__name
  }

  @computed
  get _displayName() {
    return `${this._name} store`
  }

  debug = (...args) => global.console.debug(`[${this._displayName}]`, ...args)
}

export default Store
