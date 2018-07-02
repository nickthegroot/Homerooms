import { combineReducers } from 'redux'
import configureStore from './createStore'
import { firebaseReducer } from 'react-redux-firebase'

/* ------------- Font Reducer ------------- */
const fontReducer = (state = {}, action) => {
  switch (action.type) {
    case 'START_FONT_LOAD':
      return Object.assign({}, state, {
        fontLoading: true
      })
    case 'END_FONT_LOAD':
      return Object.assign({}, state, {
        fontLoading: false
      })
    default:
      return state
  }
}

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  firebase: firebaseReducer,
  font: fontReducer
})

export default configureStore(reducers)
