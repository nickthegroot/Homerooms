import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import { firebaseReducer } from 'react-redux-firebase'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  firebase: firebaseReducer
})

export default configureStore(reducers)
