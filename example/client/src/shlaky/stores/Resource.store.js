/* eslint-disable import/no-extraneous-dependencies */
import { observable, action } from 'mobx'
import pluralize from 'pluralize'

import Store from './Store'

const INITIAL = 'initial'
const LOADING = 'loading'
const ERROR = 'error'
const LOADED = 'loaded'

class ResourceStore extends Store {
  @observable _all = []

  @observable _item = {}

  @observable populateState = INITIAL

  @observable populateError = ''

  populate = action(this.populateActionName, async () => {
    if (this.populateIsLoading()) {
      this.debug('ignoring populate request, one is already running')
      return
    }
    this.debug('Populating')
    this._all = []
    this.populateState = LOADING
    this.populateError = ''
    const { data, error } = await this.services.resource[this._name].all()
    if (error) {
      this.populateState = ERROR
      this.populateError = error
      return error
    }
    this.populateState = LOADED
    const list = data[this.listKey]
    this.debug(list)
    this._all = list
    return list
  })

  add = action(this.addActionName, async toAdd => {
    if (this.addIsLoading()) {
      this.debug('Ignoring add request, one is already running')
      return
    }
    this.debug('Adding', toAdd)
    const optimisticId = this.utils.misc.randomId()
    const optimisticAdd = { ...toAdd, optimisticId }
    this.addState = LOADING
    this.addError = ''
    // optimistic update
    this._all.push(optimisticAdd)
    const { data, errorMessage } = await this.services.resource[this._name].add(
      toAdd
    )
    if (errorMessage) {
      // revert optimistic update
      this._all = this._all.filter(item => item.optimisticId !== optimisticId)
      this.addState = ERROR
      this.addError = errorMessage
      return
    }
    const item = data[this.itemKey]
    this.debug('Added', item)
    // replace optimistic update item with server response
    this._all = this._all.map(_item =>
      _item.optimisticId === optimisticId ? data[this.itemKey] : _item
    )
    this.addState = LOADED
    return item
  })

  destroy = action(this.destroyActionName, async id => {
    this.debug(`Destroying ${this._name} ${id}`)
    const itemToDelete = this._all.find(item => item.id === id)
    const itemToDeleteIdx = this._all.findIndex(item => item.id === id)
    // optimistic update
    this._all = this._all.filter(item => item._id !== id)
    const { errorMessage } = await this.services.resource[this._name].destroy(
      id
    )
    if (errorMessage) {
      // revert optimistic update
      this._all.splice(itemToDeleteIdx, 0, itemToDelete)
      global.alert('error deleting')
      return
    }
  })

  all = () => this._all

  populateIsLoading = () => this.populateState === LOADING

  populateIsLoaded = () => this.populateState === LOADED

  populateHasError = () => this.populateState === ERROR

  isEmpty = () => this.populateIsLoaded() && !this._all.length

  addIsLoading = () => this.addState === LOADING

  addIsLoaded = () => this.addState === LOADED

  addHasError = () => this.addState === ERROR

  get populateActionName() {
    return `${this._displayName} populate`
  }

  get addActionName() {
    return `${this._displayName} add`
  }

  get destroyActionName() {
    return `${this._displayName} destroy`
  }

  get listKey() {
    return this._name
  }

  get itemKey() {
    return pluralize.singular(this.listKey)
  }
}

export default ResourceStore
