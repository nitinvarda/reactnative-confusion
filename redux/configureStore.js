import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { dishes } from './dishes'
import { comments } from './comments'
import { leaders } from './leaders'
import { promotions } from './promotions'
import { favorites } from './favourites'
import { persistStore, persistReducer } from 'redux-persist'
// import storage from '@react-native-community/async'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const configureStore = () => {

    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
    }

    const combine = combineReducers({
        dishes,
        comments,
        promotions,
        leaders,
        favorites

    })
    const store = createStore(
        persistReducer(config, combine),
        applyMiddleware(thunk, logger)
    )

    const persistor = persistStore(store)
    return { persistor, store }
}