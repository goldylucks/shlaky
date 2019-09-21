/* eslint sort-keys: "error" */

import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
// import MuiLink from '@material-ui/core/Link'

// const MyLink = props => <RouterLink {...props} />

class Link extends React.Component {
  render() {
    return <RouterLink {...this.props} />
  }
}

export default Link
