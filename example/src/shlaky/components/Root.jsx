/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import FacadeContext from '../facade/facadeContext'

@observer
class Root extends React.Component {
  render() {
    const { facade, facadeInstaceId, App } = this.props
    return (
      <FacadeContext.Provider value={facade} facadeInstaceId={facadeInstaceId}>
        <App />
      </FacadeContext.Provider>
    )
  }
}

Root.propTypes = {
  facade: PropTypes.object.isRequired,
  facadeInstaceId: PropTypes.number.isRequired,
  App: PropTypes.any.isRequired,
}

export default Root
