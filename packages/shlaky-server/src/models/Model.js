import Base from '../Base'

class Model extends Base {
  getInstance() {
    if (!this.instance) {
      this.setupInstance()
    }
    return this.instnace
  }
}

export default Model
