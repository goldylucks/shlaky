import React from 'react'
import { Link } from 'react-router-dom'

import { withShlaky } from 'shlaky-client'

class Nav extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <Link to={this.routing.get.home()}>Home</Link>
        </li>
        <li>
          <Link to={this.routing.get.signup()}>Signup</Link>
        </li>
        <li>
          <Link to={this.routing.get.login()}>Login</Link>
        </li>
        <li>
          <Link to={this.routing.get.tasks()}>Tasks</Link>
        </li>
      </ul>
    )
  }
}

export default withShlaky(Nav)
