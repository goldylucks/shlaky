/* eslint import/no-extraneous-dependencies: 0 */

import { computed } from 'mobx'

import Manager from './Manager'

const GET = 'get'
const POST = 'post'
const PUT = 'put'
const DELETE = 'delete'

class ApiManager extends Manager {
  constructor({ axios, ...args }) {
    super({ ...args })
    this.axios = axios
    this.setup()
  }

  setup() {
    this.config.resources.forEach(this.setupResource)
  }

  setupResource = resource => {
    const { key } = resource
    this[key] = this[key] || {}
    this.setupBasicCrud(key)
    if (key === 'users') {
      this.setupCurrentUser()
    }
  }

  setupCurrentUser = () => {
    this.currentUser = this.currentUser || {}
    this.currentUser.refresh = () => {
      const path = this.helpers.endpoints.currentUser.me()
      const url = this.buildUrl(path)
      return this.get(url)
    }
  }

  setupBasicCrud = key => {
    this[key] = this[key] || {}
    this[key].add = data => {
      const path = this.helpers.endpoints[key].add()
      const url = this.buildUrl(path)
      return this.post(url, data)
    }
    this[key].all = () => {
      const path = this.helpers.endpoints[key].all()
      const url = this.buildUrl(path)
      return this.get(url)
    }
    this[key].one = id => {
      const path = this.helpers.endpoints[key].one(id)
      const url = this.buildUrl(path)
      return this.get(url)
    }
    this[key].update = (id, data) => {
      const path = this.helpers.endpoints[key].update(id)
      const url = this.buildUrl(path)
      return this.put(url, data)
    }
    this[key].destroy = id => {
      const path = this.helpers.endpoints[key].destroy(id)
      const url = this.buildUrl(path)
      return this.delete(url)
    }
  }

  @computed
  get baseUrl() {
    return '/api'
  }

  /* ************************************* /
  * Requests abstractions
  /************************************** */

  // eslint-disable-next-line max-params
  get(url, data = {}, config = {}) {
    return this.request({ method: GET, url, data, config })
  }

  // eslint-disable-next-line max-params
  post(url, data = {}, config = {}) {
    return this.request({ method: POST, url, data, config })
  }

  // eslint-disable-next-line max-params
  put(url, data = {}, config = {}) {
    return this.request({ method: PUT, url, data, config })
  }

  // eslint-disable-next-line max-params
  delete(url, data = {}, config = {}) {
    return this.request({ method: DELETE, url, data, config })
  }

  request({ method, url, data, config }) {
    return this.axios({
      method,
      url,
      data,
      headers: this.headers,
      ...config,
    })
      .then(
        this.helpers.apiValidations.registerValidateResponseFor({
          url,
          data,
          config,
        })
      )
      .catch(this.formatErrorResponse)
  }

  /* ************************************* /
  * MISC
  /************************************** */

  setCurrentUser = user => {
    this.debug('Setting current user', user)
    this.currentUserToken = user.token
    return user
  }

  get headers() {
    const headers = new Headers()
    if (this.currentUserToken) {
      headers.append('Authorization', `Bearer ${this.currentUserToken}`)
    }
    return headers
  }

  formatErrorResponse = error => ({
    errorMessage: error.message,
    data: {}, // make it safe for consumers to destructure the response before knowing if it's successful
  })

  buildUrl(path) {
    return this.baseUrl + path
  }

  debug(...args) {
    global.console.debug('[API Manager]', ...args)
  }
}

export default ApiManager
