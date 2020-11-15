import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: false,
    errMess: null,
    leaders: []
}
export const leaders = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LEADERS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.ADD_LEADERS:

            return {
                ...state,
                isLoading: false,
                leaders: action.payload
            }
        case ActionTypes.LEADERS_FAILED:
            return {
                ...state,
                errMess: action.payload
            }
        default:
            return state
    }

}