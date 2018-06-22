import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { handleVoteForOption } from '../actions/questions';
import '../assets/css/questionDetails.css'
import FourNotFour from './FourNotFour'

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
    const { question, authedUser } = this.props

    if (question === null) {
      return <FourNotFour />
    }

    if (authedUser === null) {
      return <Redirect to='/login' />
    }

    return (
      <center>
        <div>
          {isQuestionAnsweredByCurrentUser(authedUser, question)
            ? (<div className='questionDetails'>
                <p>You chose : &nbsp;
                  {isOptionSelectedByCurrentUser(authedUser, question.optionOne) && question.optionOne.text}
                  {isOptionSelectedByCurrentUser(authedUser, question.optionTwo) && question.optionTwo.text}
                </p>

                  <p>{question.optionOne.votes.length} people voted for {question.optionOne.text} option.
                  That is <span style={{fontWeight:'bold', fontSize:'20px'}}>{calculatePercentage(question, question.optionOne)}</span>%
                  </p>
                  <p>{question.optionTwo.votes.length} people voted for {question.optionTwo.text} question,
                  That is <span style={{fontWeight:'bold', fontSize:'20px'}}>{calculatePercentage(question, question.optionTwo)}</span>%</p>
            </div>)
            : (<div className='questionDetails'>
                  <h1>Would you rather</h1>
                  <button
                  onClick={(e) => this.handleVote(e, 'optionOne')}
                  className='option one'
                  >
                    {question.optionOne.text}
                  </button>
                  <button
                  onClick={(e) => this.handleVote(e, 'optionTwo')}
                  className='option two'
                  >
                    {question.optionTwo.text}
                  </button>
              </div>)
          }
        </div>
      </center>
        
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