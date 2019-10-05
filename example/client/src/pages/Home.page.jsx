import React from 'react'
import { Link } from 'react-router-dom'

import { withShlaky } from 'shlaky'

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Shlaky!</h1>
        <h2>This TODO app is built with ZERO custom front end logic. Shlaky handles everything!</h2>

        <ul>
          <li><Link to={this.routing.get.signup()}>Signup</Link></li>
          <li><Link to={this.routing.get.login()}>Login</Link></li>
          <li><Link to={this.routing.get.tasks()}>Tasks</Link></li>
          <li><Link to={this.routing.get.users()}>Users</Link></li>
        </ul>
      </div>
    )
  }
}


export default withShlaky(HomePage)
