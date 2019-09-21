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
    if (typeof resource === 'string') {
      this.setupShorthandResource(resource)
    } else {
      this.setupCustomResource(resource)
    }
  }

  setupShorthandResource = resource => {
    this[resource] = Object.assign(this[resource] || {}, {
      add: (...args) => this.managers.api[resource].add(...args),
      all: (...args) => this.managers.api[resource].all(...args),
      one: (...args) => this.managers.api[resource].one(...args),
      update: (...args) => this.managers.api[resource].update(...args),
      destroy: (...args) => this.managers.api[resource].destroy(...args),
    })
  }

  setupCustomResource = resource => {
    this.setupShorthandResource(resource.name)
    this.configCustomFields(resource)
  }

  configCustomFields = resource => {
    const { name } = resource
    this[name] = this[name] || {}
    resource.fields.forEach(({ name: field }) => {
      this[name][`set${field[0].toUpperCase() + field.substr(1)}`] = newValue =>
        this.managers.api[name].update({ [field]: newValue })
    })
  }
}

export default ResourceService
