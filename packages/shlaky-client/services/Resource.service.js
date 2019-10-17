import Service from './Service'

class ResourceService extends Service {
  constructor(...args) {
    super(...args)
    this.setup()
  }

  setup = () => {
    this.config.resources.forEach(this.setupResource)
  }

  setupResource = resource => {
    this.setupBasicCrud(resource)
  }

  setupBasicCrud({ key }) {
    this[key] = Object.assign(this[key] || {}, {
      add: (...args) => this.managers.api[key].add(...args),
      all: (...args) => this.managers.api[key].all(...args),
      one: (...args) => this.managers.api[key].one(...args),
      update: (...args) => this.managers.api[key].update(...args),
      destroy: (...args) => this.managers.api[key].destroy(...args),
    })
  }
}

export default ResourceService
