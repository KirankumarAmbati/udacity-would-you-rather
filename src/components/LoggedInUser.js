import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser';

import '../assets/css/login.css'

class LoggedInUser extends Component {

  logout = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(null))
    this.props.history.push('/login')
  }

  render() {
    const { users, authedUser } = this.props
    return (
      <div>
        {authedUser !== null
          ? <div>
              <img
                src={users[authedUser].avatarURL}
                alt={`Avatar`}
                className='avatar'
              />
              <div >
                {users[authedUser].name}
              </div>
              <button onClick={(e) => this.logout(e)}>
                Logout
              </button>
          </div>
          : <div />}
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    users,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(LoggedInUser))