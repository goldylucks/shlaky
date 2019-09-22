import Helper from './Helper'

class EndpointsHelper extends Helper {
  constructor(...args) {
    super(...args)
    this.setup()
  }

  setup() {
    this.config.resources.forEach(this.setupResource)
  }

  setupResource = ({ key }) => {
    this[key] = Object.assign(this[key] || {}, {
      add: () => `/${key}`,
      all: () => `/${key}`,
      one: id => `/${key}/${id}`,
      update: id => `/${key}/${id}`,
      destroy: id => `/${key}/${id}`,
    })
  }
}

export default EndpointsHelper
