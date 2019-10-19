import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { withShlaky } from 'shlaky-client'

class LoginPage extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot password?
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Restore Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={this.routing.get.login()} variant="body2">
                  Login
                </Link>
              </Grid>
              <Grid item>
                <Link to={this.routing.get.signup()} variant="body2">
                  Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  }

  onSubmit = evt => {
    evt.preventDefault()
    global.alert(
      'password emailed to you! kinda ... well it is a demo so not really ...'
    )
  }
}

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})

export default withShlaky(LoginPage, { styles })
