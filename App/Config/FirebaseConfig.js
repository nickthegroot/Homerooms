import { NavigationActions } from 'react-navigation'
import { Alert } from 'react-native'

export const firebaseProfilePopulates = [{ child: 'lastRequest', root: 'requests' }, { child: 'seminars', root: 'teachers' }]
export const reduxFirebaseConfig = {
  userProfile: 'users',
  profileParamsToPopulate: firebaseProfilePopulates, // populate list of todos from todos ref
  enableRedirectHandling: false,
  onAuthStateChanged: onFirebaseStateChange
}

function onFirebaseStateChange (authData, firebase, dispatch) {
  const goToHome = () => {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'TabNav' })
      ]
    }))
  }

  if (authData) {
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions
          goToHome()
        } else {
          // user doesn't have permission
          firebase.messaging().requestPermission()
            .then(() => {
              // User has authorised
              goToHome()
            })
            .catch(error => {
              // User has rejected permissions
              Alert.alert(
                'Notification Permissions',
                'Without this permission, you won\'t get notifications. Are you sure you want to continue?',
                [
                  { text: 'No', onPress: () => onFirebaseStateChange(authData, firebase, dispatch) },
                  { text: 'Yes', onPress: () => goToHome(), style: 'cancel' }
                ],
                { cancelable: false }
              )
            })
        }
      })
  } else {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LaunchScreen' })
      ]
    }))
  }
}
