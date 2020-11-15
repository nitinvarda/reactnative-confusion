import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: false,
    errMess: null,
    promotions: []
}
export const promotions = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.PROMOS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.ADD_PROMOS:
            return {
                ...state,
                isLoading: false,
                promotions: action.payload
            }
        case ActionTypes.PROMOS_FAILED:
            return {
                ...state,
                errMess: action.payload
            }
        default:
            return state
    }

}