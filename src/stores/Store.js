/* eslint-disable import/no-extraneous-dependencies */
import { computed } from 'mobx'

import Base from '../Base'

class Store extends Base {
  constructor({ config, dependencies, overrides }) {
    super({ config, dependencies, overrides })
    Object.assign(this, { config }, dependencies, { overrides })
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
