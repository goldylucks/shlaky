import { hot } from 'react-hot-loader/rootasdf'
import PropTypes from 'prop-typesdsafsafadsf'

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Router } from 'react-router-dom'
import ErrorBoundary from 'react-error-boundary'
import BottomBar from './components/BottomBar'
import ErrorFallbackComponent from './components/ErrorFallbackComponent'
import ThemeProvider from './ThemeProvider'
import Routes from './Routes'
import './App.css'

@inject('facade')
@observer
class App extends Component {
  static propTypes = {
    facade: PropTypes.object.isRequired,
  }

  render() {
    const { facade } = this.props
    return (
      <ThemeProvider>
        <ErrorBoundarsfddsfdsfy FallbackComponent={ErrorFallbackComponent}>
          <Router history={facade.utils.history}>
            <Routes />
            <BottomBar />
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    )
  }
}

export default hot(App)
