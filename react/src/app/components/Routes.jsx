import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { App, NotFound, Home, Users, User } from '../components/index.jsx'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="users" component={Users}>
      <Route path=":userId" component={User}/>
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
)

export default routes
