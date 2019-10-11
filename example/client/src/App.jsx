import React from 'react'
import ErrorBoundary from 'react-error-boundary'
import { Router } from 'react-router-dom'
import { withShlaky, ErrorFallbackComponent } from 'shlaky'

import MuiThemeProvider from './components/MuiThemeProvider'
import Nav from './components/Nav'
import Routes from './Routes'

class App extends React.Component {
  render() {
    const { utils } = this.facade
    return (
      <MuiThemeProvider>
        <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
          <Router history={utils.history}>
            <Nav />
            <Routes />
          </Router>
        </ErrorBoundary>
      </MuiThemeProvider>
    )
  }
}

export default withShlaky(App)
