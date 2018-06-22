import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'

import Login from './Login'
import Home from './Home'
import LoggedInUser from './LoggedInUser'
import QuestionDetails from './QuestionDetails'
import Nav from './Nav'
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
                  : <LoggedInUser />}
                <div>
                  <Nav />
                  <Route path='/login' exact component={Login} />
                  <Route path='/' exact component={Home} />
                  <Route path='/questions/:id' exact component={QuestionDetails} />
                  <Route path='/add' exact component={NewPoll} />
                  <Route path='/leaderboard' exact component={Leaderboard} />
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