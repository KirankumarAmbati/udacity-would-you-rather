import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'

import Login from './Login'
import Home from './Home'
import AuthedUser from './AuthedUser'
import QuestionDetails from './QuestionDetails'
import Nav from './Navigation'
import NewPoll from './NewPoll'
import Leaderboard from './Leaderboard'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            {this.props.loading === true
              ? null
              : <div>
                {this.props.authedUser === null
                  ? null
                  : <AuthedUser />}
                <div>
                  <Nav />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/' component={Home} />
                  <Route exact path='/questions/:id' component={QuestionDetails} />
                  <Route exact path='/add' component={NewPoll} />
                  <Route exact path='/leaderboard' component={Leaderboard} />
                </div>
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  return {
    loading: Object.keys(users).length === 0 || Object.keys(questions).length === 0,
    authedUser
  }
}

export default connect(mapStateToProps)(App)