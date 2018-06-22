import { saveQuestionAnswer, saveQuestion } from '../utils/api'

// ADD QUESTION
export const ADD_QUESTION = 'ADD_QUESTION'

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
    return (dispatch) => {
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author
        })
        .then((question) => dispatch(addQuestion(question)))
    }
}

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

// POLL A QUESTION
export const VOTE_FOR_OPTION = 'VOTE_FOR_OPTION'

export function handleVoteForOption(info){
    return (dispatch) => {
        dispatch(voteForOption(info))

        return saveQuestionAnswer(info)
            .catch((e) => {
                console.warn('Error in handleVoteForOption: ', e)
                dispatch(voteForOption(info))
                alert('There was an error voting for this option. Try again.')
            })
    }
}

function voteForOption({ authedUser, qid, answer }){
    return {
        type: VOTE_FOR_OPTION,
        authedUser,
        qid,
        answer
    }
}

// RECEIVE QUESTIONS
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}