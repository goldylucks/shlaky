import React from 'react'

const ExternalLink = props => (
  <a
    style={{ textDecoration: 'none' }}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
)

export default ExternalLink
