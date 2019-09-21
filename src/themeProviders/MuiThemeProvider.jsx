import React, { Component } from 'react'
import { ThemeProviderr } from '@material-ui/styles'
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
    return <MuiThemeProvider theme={theme} {...this.props} />
  }
}

export default MuiThemeProvider

global.console.debug('[Theme]', theme)
