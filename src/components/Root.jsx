/* eslint sort-keys: "error" */

import React from 'react'
import PropTypes from 'prop-types'
import { Provider, observer } from 'mobx-react'
import CssBaseline from '@material-ui/core/CssBaseline'

import App from '../App'

@observer
class Root extends React.Component {
  static propTypes = {
    facade: PropTypes.object.isRequired,
    facadeInstaceId: PropTypes.number.isRequired,
  }

  render() {
    const { facade, facadeInstaceId } = this.props
    return (
      <Provider facade={facade} key={facadeInstaceId}>
        <React.Fragment>
          <CssBaseline />
          <App />
        </React.Fragment>
      </Provider>
    )
  }
}

export default Root
