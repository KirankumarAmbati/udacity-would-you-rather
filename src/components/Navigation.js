import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import '../assets/css/navigation.css'

class Nav extends Component {
  render() {
    
    const { authedUser } = this.props

    return (
      <div>
        {authedUser !== null
          ? <nav className='nav'>
                <NavLink to='/' exact activeClassName='active'>
                  Home
                </NavLink>
                <NavLink to='/add' exact activeClassName='active'>
                  New Poll
                </NavLink>
                <NavLink to='/leaderboard' exact activeClassName='active'>
                  Leaderboard
                </NavLink>
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