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
    this.config.resources.forEach(this.setupResourceFields)
  }

  setupResource = ({ key, add = {} }) => {
    const store = this.stores[key]
    this[key] = Object.assign(this[key] || {}, {
      populate: () => store.populate(),
      all: () => store.all(),
      one: id => store.one(id),
      destroy: id => store.destroy(id),
      update: (id, data) => store.update(id, data),
      add: data =>
        store
          .add(this.buildAddData({ data, add }))
          .then(this.routeIfExists(add.onSuccessRoute)),
      isEmpty: () => store.isEmpty(),
      populateIsLoading: () => store.populateIsLoading(),
      populateIsLoaded: () => store.populateIsLoaded(),
      populateHasError: () => store.populateHasError(),
      addIsLoading: () => store.addIsLoading(),
      addIsLoaded: () => store.addIsLoaded(),
      addHasError: () => store.addHasError(),
    })
  }

  setupResourceFields = ({ key, fields }) => {
    this[key].set = {}
    this[key].get = {}
    this[key].toggle = {}
    fields.forEach(({ fieldKey, type }) =>
      this.setupResourceField({ key, fieldKey, type })
    )
  }

  setupResourceField = ({ key, fieldKey, type }) => {
    this[key].set[fieldKey] = (id, nextValue) =>
      this.stores[key].update(id, { [fieldKey]: nextValue })
    this[key].get[fieldKey] = id => this.stores[key].one(id)
    if (type === 'bool') {
      this.setupResourceFieldBool({ key, fieldKey })
    }
  }

  setupResourceFieldBool({ key, fieldKey }) {
    this[key].toggle[fieldKey] = id => {
      const item = this.stores[key].one(id)
      const nextValue = !item[fieldKey]
      this.stores[key].update(id, { [fieldKey]: nextValue })
    }
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
      set: user => this.stores.currentUser.set(user),
      get: () => this.stores.currentUser.get(),
      isLoggedIn: () => this.stores.currentUser.isLoggedIn(),
    }
  }

  setupAuth() {
    extendObservable(this, {
      auth: {
        ...this.generateAuthFields(),
        signup: () => {
          const user = this.stores.auth.signup()
          console.log('user', user)
          this.currentUser.set(user)
        },
        login: () => this.stores.auth.login(),
        forgotPassword: () => this.stores.auth.forgotPassword(),
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
