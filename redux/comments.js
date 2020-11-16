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
        case ActionTypes.ADD_COMMENT:

            action.payload.id = state.comments.length + 1;
            return { ...state, errMsg: null, comments: state.comments.concat(action.payload) };

        case ActionTypes.ADD_COMMENTS:
            return {
                ...state,
                isLoading: false,
                comments: action.payload,
                errMess: null
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