import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect} from 'react-router-dom'

import { handleSaveQuestion } from '../actions/questions'

const defaultState = {
  textForOptionOne: '',
  textForOptionTwo: '',
  submit: false
}

class NewPoll extends Component {
  state = defaultState

  handleChange = (e, stateField) => {
    const text = e.target.value

    this.setState(() => ({
      [stateField]: text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { textForOptionOne, textForOptionTwo } = this.state
    const { dispatch, authedUser } = this.props

    dispatch(handleSaveQuestion(textForOptionOne, textForOptionTwo, authedUser))

    this.setState(() => ({
      textForOptionOne: '',
      textForOptionTwo: '',
      submit: true
    }))
  }
  render() {
    const { textForOptionOne, textForOptionTwo, submit } = this.state

    if (submit || this.props.authedUser === null) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3> Would you rather </h3>
        <form onSubmit={this.handleSubmit}>
          <textarea
            placeholder="First option"
            value={textForOptionOne}
            onChange={(e) => this.handleChange(e, 'textForOptionOne')}
          />
          <textarea
            placeholder="Second option"
            value={textForOptionTwo}
            onChange={(e) => this.handleChange(e, 'textForOptionTwo')}
          />
          <button
            type='submit'
            disabled={textForOptionOne === '' || textForOptionTwo === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewPoll)