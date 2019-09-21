import PropTypes from 'prop-types'
import { extendObservable } from 'mobx'
import { observer, inject } from 'mobx-react'
import withStyles from '@material-ui/styles/withStyles'

function withShlaky(WrappedComponent, { styles } = {}) {
  @inject('facade')
  @observer
  class WithShlaky extends WrappedComponent {
    static propTypes = {
      facade: PropTypes.object.isRequired,
    }

    constructor(props, context) {
      super(props, context)
      this.attachProperties(props)
    }

    attachProperties(props) {
      if (WrappedComponent.prototype.facade) {
        return
      }
      extendObservable(WrappedComponent.prototype, {
        facade: props.facade,
        auth: props.facade.auth,
        currentUser: props.facade.currentUser,
        scenes: props.facade.scenes,
        routing: props.facade.routing,
        routes: props.facade.routes,
        constants: props.facade.constants,
      })
    }

    render() {
      return WrappedComponent.prototype.render.call(this)
    }
  }

  WithShlaky.displayName = `WithShlaky(${getDisplayName(WrappedComponent)})`

  return styles ? withStyles(styles)(WithShlaky) : WithShlaky
}

export default withShlaky

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
