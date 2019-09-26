import Base from '../Base'

class Manager extends Base {
  constructor({ config, dependencies, overrides }) {
    super({ config, dependencies, overrides })
    Object.assign(this, { config }, dependencies, { overrides })
  }
}

export default Manager
