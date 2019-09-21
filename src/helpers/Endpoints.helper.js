import Helper from './Helper'

class EndpointsHelper extends Helper {
  constructor(dependencies) {
    super(dependencies)
    this.setup()
  }

  setup() {
    this.config.resources.forEach(this.setupResource)
  }

  setupResource = ({ name }) => {
    this[name] = Object.assign(this[name] || {}, {
      add: () => `/${name}`,
      all: () => `/${name}`,
      one: id => `/${name}/${id}`,
      update: id => `/${name}/${id}`,
      destroy: id => `/${name}/${id}`,
    })
  }
}

export default EndpointsHelper
