import capitalize from 'lodash/capitalize'

import Manager from './Manager'

const CURRENT_USER = 'currentUser'

class LocalStorageManager extends Manager {
  get = {}
  set = {}
  remove = {}
  
  constructor(dependencies) {
    super(dependencies)
    this.setup()
  }

  setup() {
    this.config.localStorageKeys.forEach(this.setupKey)
    if (this.usersAreDefined) {
      this.setupKey(CURRENT_USER)
    }
  }

  setupKey = key => {
    this.set[key] = data => this.set(key, data)
    this.get[key] = () => this.get(key)
    this.remove[key] = () => this.remove(key)
  }

  set(key, value) {
    this.debug(`Setting ${key}`, value)
    return localStorage.setItem(key, JSON.stringify(value))
  }

  get(key) {
    const unparsed = localStorage.getItem(key)
    try {
      const parsed = JSON.parse(unparsed)
      this.debug(`Got ${key}`, parsed)
      return parsed
    } catch (err) {
      this.reportError(`Parsing ${key}`, unparsed)
    }
  }

  remove(key) {
    this.debug(`Removing ${key}`)
    localStorage.removeItem(key)
  }

  get usersAreDefined() {
      return !!this.config.resources.find({ key: 'users' })
  }

  debug = (...args) => global.console.debug('[Local storage]', ...args)

  reportError = (...args) =>
    global.console.error('[Local storage] Error', ...args)
}

export default LocalStorageManager
