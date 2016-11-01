import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import Home from './Home'
import Layout from './Layout'
import NotFound from './NotFound'
import User from './User'
import Users from './Users'

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
