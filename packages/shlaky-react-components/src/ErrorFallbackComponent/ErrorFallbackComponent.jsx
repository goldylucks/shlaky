import React from 'react'
import PropTypes from 'prop-types'

const ErrorFallbackComponent = ({ error, componentStack }) => (
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

ErrorFallbackComponent.propTypes = {
  componentStack: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
}

export default ErrorFallbackComponent
