/* eslint import/no-extraneous-dependencies: 0 */

import { extendObservable } from 'mobx'

import Base from '../Base'

class Facade extends Base {
  constructor({ config, dependencies, overrides }) {
    super({ config, dependencies, overrides })
    Object.assign(this, { config }, dependencies, { overrides })
    this.setup()
  }

  setup() {
    this.setupRoutes()
    this.setupStates()
    this.setupResources()
    this.setupComponentsToHide()
    if (this.supportsCurrentUser) {
      this.setupCurrentUser()
      this.setupAuth()
    }
  }

  setupResources() {
    this.config.resources.forEach(this.setupResource)
  }

  setupResource = ({ key, add = {} }) => {
    this[key] = Object.assign(this[key] || {}, {
      populate: () => this.stores[key].populate(),
      all: () => this.stores[key].all(),
      one: id => this.stores[key].one(id),
      destroy: id => this.stores[key].destroy(id),
      update: (id, data) => this.stores[key].update(id, data),
      add: data =>
        this.stores[key]
          .add(this.buildAddData({ data, add }))
          .then(this.routeIfExists(add.onSuccessRoute)),
      isEmpty: () => this.stores[key].isEmpty(),
      populateIsLoading: () => this.stores[key].populateIsLoading(),
      populateIsLoaded: () => this.stores[key].populateIsLoaded(),
      populateHasError: () => this.stores[key].populateHasError(),
      addIsLoading: () => this.stores[key].addIsLoading(),
      addIsLoaded: () => this.stores[key].addIsLoaded(),
      addHasError: () => this.stores[key].addHasError(),
    })
  }

  buildAddData({ data, add }) {
    if (!add.data) {
      return data
    }
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
  }

  setupAuth() {
    extendObservable(this, {
      auth: {
        ...this.generateAuthFields(),
        signup: () => this.stores.auth.signup(),
        login: () => this.stores.auth.login(),
        forgotPassword: () => this.stores.auth.login(),
      },
    })
  }

  setupRoutes() {
    this.routing = this.routing || {}
    this.routing.get = this.routing.get || {}
    this.routing.is = this.routing.is || {}
    this.routing.to = this.routing.to || {}
    this.routing.get = Object.assign(
      this.routing.get,
      this.managers.routing.get
    )
    this.routing.is = Object.assign(this.routing.is, this.managers.routing.is)
    this.routing.to = Object.assign(this.routing.to, this.managers.routing.to)
  }

  setupStates() {
    this.config.states.forEach(this.setupState)
  }

  setupState = ({ key }) => {
    this[key] = {
      get: () => this.stores[key].get(),
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
            return this.managers.routing.is[route]()
          }),
      },
    })
  }

  generateAuthFields = () =>
    this.userFields.reduce(
      (acc, { fieldKey }) => ({
        get: {
          ...acc.get,
          [fieldKey]: () => this.stores.auth.get(fieldKey),
        },
        set: {
          ...acc.set,
          [fieldKey]: evt => this.stores.auth.set(fieldKey, evt.target.value),
        },
      }),
      { get: {}, set: {} }
    )
}

export default Facade
