/* eslint import/no-extraneous-dependencies: 0 */

import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import withStyles from '@material-ui/styles/withStyles'

import FacadeContext from '../facade/facadeContext'

function withShlaky(WrappedComponent, { styles } = {}) {
  @observer
  class WithShlaky extends WrappedComponent {
    constructor(props, context) {
      super(props, context)
      this.attachProperties(props, context)
    }

    attachProperties(props, context) {
      if (WrappedComponent.prototype.facade) {
        return
      }
      const facade = context.value
      const properties = {
        facade,
        routing: facade.routing,
        constants: facade.constants,
      }
      if (facade.supportsCurrentUser) {
        properties.auth = facade.auth
        properties.currentUser = facade.currentUser
        properties.users = facade.users
      }

      facade.config.resources.forEach(({ key }) => {
        properties[key] = facade[key]
      })
      facade.config.states.forEach(({ key }) => {
        properties[key] = facade[key]
      })

      extendObservable(WrappedComponent.prototype, properties)
    }

    render() {
      return WrappedComponent.prototype.render.call(this)
    }
  }

  WithShlaky.contextType = FacadeContext

  WithShlaky.displayName = `WithShlaky(${getDisplayName(WrappedComponent)})`

  return styles ? withStyles(styles)(WithShlaky) : WithShlaky
}

export default withShlaky

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
