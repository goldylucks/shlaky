import { computed } from 'mobx'

import Manager from './Manager'

const GET = 'get'
const POST = 'post'
const PUT = 'put'
const DELETE = 'delete'

class ApiManager extends Manager {
  constructor(dependencies) {
    super(dependencies)
    this.axios = dependencies.axios
    this.setup()
  }

  setup() {
    this.config.resources.forEach(this.setupResource)
  }

  setupResource = resource => {
    if (resource.name === 'currentUser') {
      this.setupCurrentUser(resource)
    } else if (typeof resource === 'string') {
      this.setupShorthandResource(resource)
    } else {
      this.setupCustomResource(resource)
    }
  }

  // TODO current user should get fields from users resource
  // actually, current user should be set automatically if users resource is listed
  setupCurrentUser = resource => {
    this.currentUser = this.currentUser || {}
    this.currentUser.refresh = () => {
      const path = this.helpers.endpoints.currentUser.me()
      const url = this.buildUrl(path)
      return this.get(url)
    }
    this.setupCustomFields(resource)
  }

  setupShorthandResource = resource => {
    this[resource] = this[resource] || {}
    this[resource].add = data => {
      const path = this.helpers.endpoints[resource].add()
      const url = this.buildUrl(path)
      return this.post(url, data)
    }
    this[resource].all = () => {
      const path = this.helpers.endpoints[resource].all()
      const url = this.buildUrl(path)
      return this.get(url)
    }
    this[resource].one = id => {
      const path = this.helpers.endpoints[resource].one(id)
      const url = this.buildUrl(path)
      return this.get(url)
    }
    this[resource].update = (id, data) => {
      const path = this.helpers.endpoints[resource].update(id)
      const url = this.buildUrl(path)
      return this.put(url, data)
    }
    this[resource].destroy = id => {
      const path = this.helpers.endpoints[resource].destroy(id)
      const url = this.buildUrl(path)
      return this.delete(url)
    }
  }

  setupCustomResource = resource => {
    const { name } = resource
    this[name] = this[name] || {}
    this.setupShorthandResource(name)
    this.setupCustomFields(resource)
  }

  setupCustomFields = resource => {
    const { name } = resource
    this[name] = this[name] || {}
    resource.fields.forEach(({ name: field }) => {
      this[name][
        `set${field[0].toUpperCase() + field.substr(1)}`
      ] = newValue => {
        const path = this.helpers.endpoints[name].update()
        const url = this.buildUrl(path)
        const data = { [field]: newValue }
        return this.put(url, data)
      }
    })
  }

  @computed
  get baseUrl() {
    return this.config.baseUrl
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
    errorMessage: error.response.data.messages.join(', '),
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
