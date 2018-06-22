import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import '../assets/css/question.css'

class Question extends Component {
  render() {
    const { id, question: {optionOne, optionTwo} } = this.props
      
    return (
      <div>
        <Link to={`/questions/${id}`} className='question'>
          <p> Would you rather &nbsp;
            <span className="questionOptionOne">{optionOne.text}</span>
            &nbsp;OR&nbsp; 
            <span className="questionOptionTwo">{optionTwo.text}</span>
          </p>
        </Link>
      </div>
    )
  }
}

function mapStateToProps({ questions }, { id }) {
  const question = questions[id]

  return {
    id,
    question
  }
}

export default connect(mapStateToProps)(Question)