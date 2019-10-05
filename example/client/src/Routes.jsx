import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/Home.page'
import SurprisePage from './pages/Surprise.page'
import TasksPage from './pages/Tasks.page'
import LoginPage from './pages/Login.page'
import SignupPage from './pages/Signup.page'
import ForgotPasswordPage from './pages/ForgotPassword.page'
import UsersPage from './pages/Users.page'
import { withShlaky } from 'shlaky'

class Routes extends Component {
  render() {
    const { facade } = this
    return (
      <Switch>
        <Route path={facade.routing.get.home()} exact component={HomePage} />
        <Route path={facade.routing.get.surprise()} exact component={SurprisePage} />
        <Route path={facade.routing.get.login()} exact component={LoginPage} />
        <Route path={facade.routing.get.signup()} exact component={SignupPage} />
        <Route path={facade.routing.get.forgotPassword()} exact component={ForgotPasswordPage} />
        <Route path={facade.routing.get.tasks()} exact component={TasksPage} />
        <Route path={facade.routing.get.users()} exact component={UsersPage} />
      </Switch>
    )
  }
}

export default withShlaky(Routes)
