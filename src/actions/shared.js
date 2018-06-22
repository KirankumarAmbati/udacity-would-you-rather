import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { setAuthedUser } from './authedUser'
import { receiveQuestions } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())

        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(setAuthedUser(null))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}