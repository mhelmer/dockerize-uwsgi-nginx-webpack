import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from 'components/Home'
import Layout from 'components/Layout'
import NotFound from 'components/NotFound'
import Users from 'components/Users'

const Routes = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
)

export default Routes
