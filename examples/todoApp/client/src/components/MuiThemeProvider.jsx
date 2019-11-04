/* eslint import/no-extraneous-dependencies: 0 */

import React, { Component } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const SPACING = 8

const theme = createMuiTheme({
  spacing: SPACING,
  typography: {
    useNextVariants: true,
  },
  containerPadding: SPACING * 2,
})

class MuiThemeProvider extends Component {
  render() {
    return <ThemeProvider theme={theme} {...this.props} />
  }
}

export default MuiThemeProvider

if (process.env.REACT_APP_ENV !== 'production') {
  global.theme = theme
}
