import { extendObservable } from 'mobx'

class Facade {
  constructor({ config, utils, helpers, managers, services, stores }) {
    this.config = config
    this.utils = utils
    this.helpers = helpers
    this.managers = managers
    this.services = services
    this.stores = stores
  }

  setup() {
    this.setupRoutes()
    this.setupStates()
    this.setupResources()
    this.setupCurrentUser()
    this.setupComponentsToHide()
  }

  setupResources() {
    this.config.resources.forEach(this.setupResource)
  }

  setupResource = ({ name, fields, add }) => {
    this[name] = Object.assign(this[name] || {}, {
      populate: () => this.stores[name].populate(),
      all: () => this.stores[name].all(),
      one: id => this.stores[name].one(id),
      destroy: id => this.stores[name].destroy(id),
      add: data =>
        this.stores[name]
          .add(this.buildAddData({ data, add }))
          .then(this.routeIfExists(add.onSuccessRoute)),
      isEmpty: () => this.stores[name].isEmpty(),
      populateIsLoading: () => this.stores[name].populateIsLoading(),
      populateIsLoaded: () => this.stores[name].populateIsLoaded(),
      populateHasError: () => this.stores[name].populateHasError(),
      addIsLoading: () => this.stores[name].addIsLoading(),
      addIsLoaded: () => this.stores[name].addIsLoaded(),
      addHasError: () => this.stores[name].addHasError(),
    })
    fields.forEach(this.setupResourceField(name))
  }

  buildAddData({ data, add }) {
    return add.data.reduce(
      (acc, { name, value }) => ({
        ...acc,
        [name]: this.stringOperator(value),
      }),
      data
    )
  }

  routeIfExists(route) {
    if (!route) {
      return
    }
    this.routing.to[route]()
  }

  stringOperator(value) {
    const [key, field] = value.split('.')
    return this[key][field].value()
  }

  setupCurrentUser() {
    this.currentUser = {
      logout: () => this.stores.currentUser.logout(),
      refresh: () => this.stores.currentUser.refresh(),
    }
    this.config.resources
      .find(resource => resource.name === 'users')
      .fields.forEach(this.setupResourceField('currentUser'))
  }

  setupResourceField = resourceKey => ({ name, type }) => {
    if (name === 'id') {
      this[resourceKey][name] = {
        value: () => this.stores[resourceKey].getField(name),
      }
      return
    }
    this[resourceKey][name] = {
      value: () => this.stores[resourceKey].getField(name),
      update: value => this.stores[resourceKey].updateField({ name, value }),
    }
    if (type === 'bool') {
      this[resourceKey][name].toggle = () =>
        this.stores[resourceKey].toggleField({ name })
    }
  }

  setupRoutes() {
    this.routing = this.routing || {}
    this.routing.get = this.routing.get || {}
    this.routing.is = this.routing.is || {}
    this.routing.to = this.routing.to || {}
    this.routing.get = Object.assign(
      this.routing.get,
      this.services.routing.get
    )
    this.routing.is = Object.assign(this.routing.is, this.services.routing.is)
    this.routing.to = Object.assign(this.routing.to, this.services.routing.to)
  }

  setupStates() {
    Object.entries(this.config.states).forEach(this.setupState)
  }

  setupState = ({ key }) => {
    this[key] = {
      value: () => this.stores[key].value(),
      set: value => this.stores[key].set(value),
      is: value => this.stores[key].is(value),
    }
  }

  setupComponentsToHide() {
    this.config.components.forEach(this.setupComponentToHide)
  }

  setupComponentToHide = ({ name, routesToHide }) => {
    extendObservable(this, {
      [name]: {
        isHidden: () =>
          routesToHide.some(route => {
            return this.services.routing.is[route]()
          }),
      },
    })
  }
}

export default Facade
