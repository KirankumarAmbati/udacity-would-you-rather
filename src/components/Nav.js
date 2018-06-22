import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import '../assets/css/nav.css'

class Nav extends Component {
  render() {
    
    const { authedUser } = this.props

    return (
      <div>
        {authedUser !== null
          ? <nav className='nav'>
            <ul>
              <li>
                <NavLink to='/add' exact activeClassName='active'>
                  New Poll
                </NavLink>
              </li>
              <li>
                <NavLink to='/' exact activeClassName='active'>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/leaderboard' exact activeClassName='active'>
                  Leaderboard
                </NavLink>
              </li>
            </ul>
          </nav>
          : null}
      </div>

    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Nav)