import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: false,
    errMess: null,
    token: null
}
export const login = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                token: action.payload,
                isLoading: false
            }
        case ActionTypes.LOGIN_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            }
        default:
            return state
    }
}