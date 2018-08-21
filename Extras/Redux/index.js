import { combineReducers } from 'redux'
import configureStore from './createStore'
import { firebaseReducer } from 'react-redux-firebase'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  firebase: firebaseReducer
})

export default configureStore(reducers)
