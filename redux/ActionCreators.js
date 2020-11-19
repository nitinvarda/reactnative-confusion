import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import axios from 'axios'


export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                var errMess = new Error(error.message)
                throw errMess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentFailed(error.message)))
}

export const commentFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess

})
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

// dishes

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading())
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                var errMess = new Error(error.message)
                throw errMess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess

})
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

// promos

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading())
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                var errMess = new Error(error.message)
                throw errMess;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)))
}

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess

})
export const addPromos = (promo) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promo
})

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

// leaders

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading())
    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                var errMess = new Error(error.message)
                throw errMess;
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess

})
export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
})


export const postFavorite = (dishId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 2000)
}

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVOURITE,
    payload: dishId
})


export const postComment = (Comment) => dispatch => {

    setTimeout(() => {
        dispatch(addComment(Comment));
    }, 2000)

}

export const addComment = (Comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: Comment
})


export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
})



export const loginUser = (email, password) => async (dispatch) => {

    dispatch({ type: ActionTypes.LOGIN_USER_LOADING })
    try {
        const response = await axios.post(baseUrl + 'users/signin', { email, password })
        console.log(response)
        dispatch({ type: ActionTypes.LOGIN_USER_SUCCESS, payload: response.data.token })
    }
    catch (err) {
        dispatch({ type: ActionTypes.LOGIN_USER_FAILED, payload: err })
    }

}