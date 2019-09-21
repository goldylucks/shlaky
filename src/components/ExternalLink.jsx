/* eslint sort-keys: "error" */

import React, { Component } from 'react'

class ExternalLink extends Component {
  render() {
    return (
      <a
        {...this.props}
        style={{ textDecoration: 'none' }}
        target="_blank"
        rel="noopener noreferrer"
      />
    )
  }
}

export default ExternalLink
