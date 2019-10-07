import Base from '../Base'

class Util extends Base {
  constructor({ config, dependencies, overrides }) {
    super({ config, dependencies, overrides })
    this.config = config
  }
}

export default Util
