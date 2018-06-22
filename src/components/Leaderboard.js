import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


import '../assets/css/leaderBoard.css'

function getNumberOfUserQuestionsAsked(questions, user) {
  let sum = 0
  Object.entries(questions).forEach(([key, value]) => {
    if (value.author === user) {
      sum++
    }
  })
  return sum
}

function getNumberOfUserQuestionsAnswered(questions, user) {
  let sum = 0
  Object.entries(questions).forEach(([key, value]) => {
    if (value.optionOne.votes.includes(user) ||
      value.optionTwo.votes.includes(user)) {
      sum++
    }
  })
  return sum
}

function getTotalNumberOfUserQuestions(questions, user) {
  return getNumberOfUserQuestionsAsked(questions, user) 
    + getNumberOfUserQuestionsAnswered(questions, user)
}

class Leaderboard extends Component {

  render() {
    const { users, userIds, questions, authedUser } = this.props

    if (authedUser === null) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h1
          style ={{
            margin:'60px'
          }}
        >Leaderboard</h1>
        <ul>
          {userIds.map((id) => (
            <li
              key={id}
              className="list"
            >
              <div>
                <img
                  src={users[id].avatarURL}
                  alt={`Avatar of user`}
                  className='avatar'
                />
                <h2>{users[id].name}</h2>
                <p>Questions asked: {getNumberOfUserQuestionsAsked(questions, id)}</p>
                <p>Questions answered: {getNumberOfUserQuestionsAnswered(questions, id)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users, userIds, authedUser, questions }) {
  return {
    users,
    userIds: Object.keys(users).sort((a,b) => getTotalNumberOfUserQuestions(questions, b)
      - getTotalNumberOfUserQuestions(questions, a)),
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(Leaderboard)