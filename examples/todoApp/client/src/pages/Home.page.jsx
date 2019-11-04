import React from 'react'

import { withShlaky } from 'shlaky-client'

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
