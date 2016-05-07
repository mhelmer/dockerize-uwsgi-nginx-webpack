import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

const NotFound = React.createClass({
  render() {
    return (
      <h1>Not Found</h1>
    )
  }
})


const Index = React.createClass({
  render() {
    return (
      <div>
        <h1>Index</h1>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    )
  }
})

const About = () => (
    <h2>About</h2>
)

const Users = React.createClass({
  render() {
    return (
      <div>
        <h2>Users</h2>
        {this.props.children}
      </div>
    )
  }
})


const User = React.createClass({
  render() {
    console.log(this.props)
    return (
      <div>
        <h2>{ this.props.params.userId }</h2>
      </div>
    )
  }
})

render((
  <Router history={browserHistory}>
    <Route path="/" component={Index}>
      <Route path="about" component={About} />
      <Route path="users" component={Users}>
        <Route path="/users/:userId" component={User}/>
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('app'))
