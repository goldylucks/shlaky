import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Link } from 'react-router-dom'

import { withShlaky } from 'shlaky-client'

class TopBar extends React.Component {
  render() {
    const { classes } = this.props
    const { currentUser } = this

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <div className={classes.leftSide}>
              <Link to={this.routing.get.home()}>
                <HomeIcon />
              </Link>
            </div>
            <div>
              <Link to={this.routing.get.tasks()}>Tasks</Link>
            </div>
            {currentUser.isLoggedIn() ? (
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => this.routing.to.profile()}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <>
                <Link to={this.routing.get.login()}>Login</Link>
                <Link to={this.routing.get.signup()}>Signup</Link>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  leftSide: {
    flexGrow: 1,
  },
})

export default withShlaky(TopBar, { styles })
