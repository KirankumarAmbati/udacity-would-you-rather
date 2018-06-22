import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { handleVoteForOption } from '../actions/questions';

class QuestionDetails extends Component {
  handleVote = (e, option) => {
    e.preventDefault()

    const { dispatch, authedUser, id } = this.props

    dispatch(handleVoteForOption({
      authedUser,
      qid: id,
      answer: option
    }))
  }

  render() {
    const { question, authedUser, users } = this.props
    if (authedUser === null) {
      return <Redirect to='/login' />
    }
    if (question === null) {
      return <p>Oops !! 404 !</p>
    }
    const avatar = getAvatar(question, users)

    return (
      <div>
        {isQuestionAnsweredByCurrentUser(authedUser, question)
          ? (<div className='questionDetails'>
              <p>This Question is answered</p>
              <p>Option A: {question.optionOne.text}</p>
                <p>{question.optionOne.votes.length} people voted for this option.
                That is {calculatePercentage(question, question.optionOne)} Percent!
                {isOptionSelectedByCurrentUser(authedUser, question.optionOne) && ' You have selected this option!'}</p>
              <p>Option B: {question.optionTwo.text}</p>
                <p>{question.optionTwo.votes.length} people voted for this question,
                That are {calculatePercentage(question, question.optionTwo)} Percent!
                {isOptionSelectedByCurrentUser(authedUser, question.optionTwo) && ' You have selected this option!'}</p>
          </div>)
          : (<div className='questionDetails'>
            <img
              src={avatar}
              alt={`${avatar ? avatar.name : 'Name not found.'}`}
              className='avatar'
            />
            <p>Would you rather</p>
            <button onClick={(e) => this.handleVote(e, 'optionOne')}>
              {question.optionOne.text}
            </button>
            <button onClick={(e) => this.handleVote(e, 'optionTwo')}>
              {question.optionTwo.text}
            </button>
          </div>)
        }
      </div>
    )
  }
}

function calculatePercentage(question, option) {
  let total = question.optionOne.votes.length + question.optionTwo.votes.length
  return (option.votes.length / total * 100).toFixed(2)
}

function isQuestionAnsweredByCurrentUser(authedUser, question) {
  if (question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser)) {
    return true
  }
  return false
}

function isOptionSelectedByCurrentUser(authedUser, option) {
  if (option.votes.includes(authedUser) ||
    option.votes.includes(authedUser)) {
    return true
  }
  return false
}

function getAvatar(question, users) {
  let avatar = question && question.author && users[question.author] && users[question.author].avatarURL
    ? users[question.author].avatarURL
    : null
  return avatar
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params
  return {
    question: questions[id]
      ? questions[id]
      : null,
    users,
    authedUser,
    id
  }
}

export default connect(mapStateToProps)(QuestionDetails)