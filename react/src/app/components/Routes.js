import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Home from 'components/Home'
import Layout from 'components/Layout'
import NotFound from 'components/NotFound'
import User from 'components/Users/User'
import Users from 'components/Users'

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="users" component={Users}>
      <Route path=":userId" component={User}/>
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
)

export default routes
