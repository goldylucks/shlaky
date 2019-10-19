/* eslint import/no-extraneous-dependencies: 0 */

import Meta from './Meta'

class BootingMeta extends Meta {
  boot() {
    if (this.supportsCurrentUser) {
      this.handleCurrentUser()
    }
    global.console.debug('Boot successful')
    return Promise.resolve(true)
  }

  handleCurrentUser() {
    const user = this.stores.currentUser.hydrateUserFromLocalStorage()
    if (user) {
      this.managers.api.setCurrentUser(user)
      this.stores.currentUser.refresh()
      this.handleRedirectUser()
    }
  }

  handleRedirectUser = () => {
    if (this.managers.routing.is.auth()) {
      this.managers.routing.to.home()
    }
  }

  handleRedirectGuest = () => {
    this.managers.routing.to.auth()
  }
}

export default BootingMeta
