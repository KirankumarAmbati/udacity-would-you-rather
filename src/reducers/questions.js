import { 
    ADD_QUESTION,
    VOTE_FOR_OPTION,
    RECEIVE_QUESTIONS
} from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]:action.question
            }        
        case VOTE_FOR_OPTION:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        default:
            return state
    }
}