import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: false,
    errMess: null,
    comments: []
}
export const comments = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.COMMENTS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.ADD_COMMENTS:
            return {
                ...state,
                isLoading: false,
                comments: action.payload
            }
        case ActionTypes.COMMENTS_FAILED:
            return {
                ...state,
                errMess: action.payload
            }
        default:
            return state
    }

}