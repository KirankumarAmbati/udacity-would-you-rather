import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function getNumberOfUserQuestionsAsked(questions, user) {
  let sum = 0
  Object.entries(questions).forEach(([key, value]) => {
    if (value.author === user) sum++
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
  let total = getNumberOfUserQuestionsAsked(questions, user) +
    getNumberOfUserQuestionsAnswered(questions, user)
  return total
}

class Leaderboard extends Component {

  render() {
    const { users, userIds, questions, authedUser } = this.props

    if (authedUser === null) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h3>Leaderboard</h3>
        <ul>
          {userIds.map((id) => (
            <li key={id}>
              <div>
                <img
                  src={users[id].avatarURL}
                  alt={`Avatar of user`}
                  className='avatar'
                />
                <p>Username: {users[id].name}</p>
                <p>Asked questions: {getNumberOfUserQuestionsAsked(questions, id)}</p>
                <p>Answered questions: {getNumberOfUserQuestionsAnswered(questions, id)}</p>
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