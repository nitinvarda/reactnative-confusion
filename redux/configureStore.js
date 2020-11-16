import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { dishes } from './dishes'
import { comments } from './comments'
import { leaders } from './leaders'
import { promotions } from './promotions'
import { favorites } from './favourites'

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders,
            favorites

        }),
        applyMiddleware(thunk)
    )

    return store
}