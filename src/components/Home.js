import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'

import '../assets/css/homePage.css'

class Home extends Component {
  state = {
    showAnswered: false
  }

  render() {
    const { showAnswered } = this.state
    const { authedUser, answeredQuestionIds, unansweredQuestionIds } = this.props

    if (authedUser === null) {
      return <Redirect to='/login' />
    }

    return (
      <center>
        <div className='homepage'>
        <h3>Dashboard</h3>
        <button
          onClick={(e) => this.setState((prevState) => ({ showAnswered: !prevState.showAnswered }))}
          className={showAnswered === true ? 'btn answered': 'btn unanswered'} 
        >
          {showAnswered === true ? 'Answered questions' : 'Unanswered questions'}
        </button>
        <div>
          <ul>
            {showAnswered
              ? answeredQuestionIds.map((id) => (
                <li key={id} className="homeList">
                  <Question id={id} />
                </li>
              ))
              : unansweredQuestionIds.map((id) => (
                <li key={id} className="homeList">
                  <Question id={id} />
                </li>
              ))}
          </ul>
        </div>
      </div>
      </center>
    )
  }
}

function getUnansweredQuestionIds(authedUser, questions) {
  return Object.keys(questions)
    //get all questionsIds which the authedUser NOT answered
    .filter((key) => !questions[key].optionOne.votes.includes(authedUser)
      && !questions[key].optionTwo.votes.includes(authedUser))
    //sort it so the most recently questionIds are on top
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
}

function getAnsweredQuestionIds(authedUser, questions) {
  return Object.keys(questions)
    //get all questionsIds which the authedUser answered
    .filter((key) => questions[key].optionOne.votes.includes(authedUser)
      || questions[key].optionTwo.votes.includes(authedUser))
    //sort it so the most recently questionIds are on top
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
}

function mapStateToProps({ authedUser, questions }) {
  return {
    authedUser,
    unansweredQuestionIds: getUnansweredQuestionIds(authedUser, questions),
    answeredQuestionIds: getAnsweredQuestionIds(authedUser, questions)
  }
}

export default connect(mapStateToProps)(Home)