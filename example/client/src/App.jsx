import React from 'react'
import ErrorBoundary from 'react-error-boundary'
import { Router } from 'react-router-dom'

import MuiThemeProvider from './components/MuiThemeProvider'
import ErrorFallbackComponent from './shlaky/components/ErrorFallbackComponent'
import Routes from './Routes'
import { withShlaky } from './shlaky'

class App extends React.Component {
  render() {
    const { utils } = this.facade
    return (
      <MuiThemeProvider>
        <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
          <Router history={utils.history}>
            <Routes />
          </Router>
        </ErrorBoundary>
      </MuiThemeProvider>
    )
  }
}

export default withShlaky(App)
