import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/Home.page'
import SurprisePage from './pages/Surprise.page'
import AuthPage from './pages/Auth.page'
import TasksPage from './pages/Tasks.page'
import { withShlaky } from './shlaky'

class Routes extends Component {
  render() {
    const { facade } = this
    return (
      <Switch>
        <Route path={facade.routing.get.home()} exact component={HomePage} />
        <Route path={facade.routing.get.surprise()} exact component={SurprisePage} />
        <Route path={facade.routing.get.auth()} exact component={AuthPage} />
        <Route path={facade.routing.get.tasks()} exact component={TasksPage} />
      </Switch>
    )
  }
}

export default withShlaky(Routes)
