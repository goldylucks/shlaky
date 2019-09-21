/* eslint sort-keys: "error" */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ErrorFallbackComponent extends Component {
  static propTypes = {
    componentStack: PropTypes.string.isRequired,
    error: PropTypes.object.isRequired,
  }

  render() {
    const { error, componentStack } = this.props
    return (
      <div>
        <p>
          <strong>Oops! An error occured!</strong>
        </p>
        <p>Here’s what we know…</p>
        <p>
          <strong>Error:</strong> {error.toString()}
        </p>
        <p>
          <strong>Stacktrace:</strong> {componentStack}
        </p>
      </div>
    )
  }
}

export default ErrorFallbackComponent
