import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Link, withRouter } from 'react-router-dom'

import '../assets/css/login.css'

class Login extends Component {

  handleSetAuthedUser = (e, id) => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(setAuthedUser(id))
  }

  render() {
    const { users, userIds, authedUser } = this.props

    if(authedUser !== null){
      this.props.history.push('/')
    }

    return (
      <div>
        <ul>
          {userIds.map((id) => (
            <li key={id} className="list">
            <div className='login' onClick={(e) => this.handleSetAuthedUser(e, id)}>
              <Link to={`/`} >
                <img
                  src={users[id].avatarURL}
                  alt={`Avatar of user`}
                  className='avatar'
                />
                <span className="name">
                  {users[id].name}
                </span>
              </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  return {
    users: users,
    userIds: Object.keys(users),
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(Login))