import firebase from 'firebase'
import { reactReduxFirebase } from 'react-redux-firebase'
import { firebaseConfig, reduxFirebaseConfig } from '../Config/FirebaseConfig.js'
import { createStore, compose } from 'redux'

// Creating the store
export default (rootReducer) => {
  /* ------------- Redux Configuration ------------- */
  const enhancers = []

  /* ------------- Firebase Enhancer ------------- */
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  enhancers.push(reactReduxFirebase(firebaseApp, reduxFirebaseConfig))

  /* ------------- Combining Enhancers and Creating Store ------------- */
  const store = createStore(rootReducer, compose(...enhancers))
  return store
}
