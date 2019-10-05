import React from 'react'
import ErrorBoundary from 'react-error-boundary'
import { Router } from 'react-router-dom'
import { withShlaky, ErrorFallbackComponent } from 'shlaky'

import MuiThemeProvider from './components/MuiThemeProvider'
import Routes from './Routes'

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
