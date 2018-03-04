import { NavigationActions } from 'react-navigation'

export const firebaseProfilePopulates = [{ child: 'lastRequest', root: 'requests' }, { child: 'seminars', root: 'teachers' }]
export const reduxFirebaseConfig = {
  userProfile: 'users',
  profileParamsToPopulate: firebaseProfilePopulates, // populate list of todos from todos ref
  enableRedirectHandling: false,
  onAuthStateChanged: onFirebaseStateChange
}

function onFirebaseStateChange (authData, firebase, dispatch) {
  if (authData) {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'TabNav' })
      ]
    }))
  } else {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LaunchScreen' })
      ]
    }))
  }
}
