import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from 'components/Home'
import Layout from 'components/Layout'
import NotFound from 'components/NotFound'
import User from 'components/Users/User'
import Users from 'components/Users'

const Routes = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" render={({ match }) => (
        <Users>
          <Route path={`${match.url}/:userId`} component={User} />
        </Users>
      )} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
)

export default Routes
