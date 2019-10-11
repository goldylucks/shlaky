import React from 'react'
import { Link } from 'react-router-dom'

import { withShlaky } from 'shlaky'

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Shlaky!</h1>
        <h2>This TODO app is built with ZERO custom front end logic. Shlaky handles everything!</h2>
      </div>
    )
  }
}


export default withShlaky(HomePage)
