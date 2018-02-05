import { createStore, applyMiddleware, compose } from 'redux'
import Config from '../Config/DebugConfig'
import ScreenTracking from './ScreenTrackingMiddleware'
import { reactReduxFirebase } from 'react-redux-firebase'
import Firebase from 'react-native-firebase'
import { reduxFirebaseConfig } from '../Config/FirebaseConfig'

// creates the store
export default (rootReducer) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  /* ------------- Firebase Enhancer ------------- */

  const firebase = Firebase.app()
  enhancers.push(reactReduxFirebase(firebase, reduxFirebaseConfig))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  return store
}
