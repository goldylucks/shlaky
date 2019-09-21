/* eslint-disable no-underscore-dangle */
import { observable, action } from 'mobx'

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
    this.debug(data)
    this._all = data
    return data
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
    const { data, error } = await this.services.resource[this._name].add(toAdd)
    if (error) {
      // revert optimistic update
      this._all = this._all.filter(item => item.optimisticId !== optimisticId)
      this.addState = ERROR
      this.addError = error
      return
    }
    this.debug('Added', data)
    // replace optimistic update item with server item
    this._all = this._all.map(item =>
      item.optimisticId === optimisticId ? data : item
    )
    this.addState = LOADED
    return data
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
}

export default ResourceStore
