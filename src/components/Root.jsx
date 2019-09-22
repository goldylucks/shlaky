/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import { Provider, observer } from 'mobx-react'

@observer
class Root extends React.Component {
  render() {
    const { facade, facadeInstaceId, App } = this.props
    return (
      <Provider facade={facade} key={facadeInstaceId}>
        {App}
      </Provider>
    )
  }
}

Root.propTypes = {
  facade: PropTypes.object.isRequired,
  facadeInstaceId: PropTypes.number.isRequired,
  App: PropTypes.any.isRequired,
}

export default Root
