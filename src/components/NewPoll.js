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
      <div
        style={{
          margin:'10px'
        }}
      >
        <h3> Would you rather </h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type = "text"
            style = {{
              height:'30px',
              width:'200px',
              margin:'10px'
            }}
            placeholder="First option"
            value={textForOptionOne}
            onChange={(e) => this.handleChange(e, 'textForOptionOne')}
          />
          <input
            type = "text"
            style = {{
              height:'30px',
              width:'200px',
              margin:'10px'
            }}
            placeholder="Second option"
            value={textForOptionTwo}
            onChange={(e) => this.handleChange(e, 'textForOptionTwo')}
          />
          <div>
            <button
              type='submit'
              style={{
                  border: '2px solid black',
                  color: 'white',
                  backgroundColor: 'green',
                  width: '200px',
                  height: '40px',
                  margin: '10px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontFamily: 'Courier New, Courier, monospace'
              }}
              disabled={textForOptionOne === '' || textForOptionTwo === ''}>
              Submit
            </button>
          </div>
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