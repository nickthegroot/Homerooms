import { NavigationActions } from 'react-navigation'
import { Permissions, Notifications } from 'expo'
import NavigationService from '../Navigation/NavigationService'

export const firebaseConfig = {
  apiKey: 'AIzaSyAsDkP98e6lKa2rVfwjlOD-HQmpx3xn-6E',
  authDomain: 'homerooms-nbdeg.firebaseapp.com',
  databaseURL: 'https://homerooms-nbdeg.firebaseio.com',
  projectId: 'homerooms-nbdeg',
  storageBucket: 'homerooms-nbdeg.appspot.com',
  messagingSenderId: '455349106342'
}
export const firebaseProfilePopulates = [{ child: 'requests', root: 'requests' }, { child: 'seminars', root: 'teachers' }]
export const reduxFirebaseConfig = {
  userProfile: 'users',
  profileParamsToPopulate: firebaseProfilePopulates, // populate list of todos from todos ref
  enableRedirectHandling: false,
  onAuthStateChanged: onFirebaseStateChange
}

async function onFirebaseStateChange (authData, firebase, dispatch) {
  const goToHome = () => {
    NavigationService.clearStackAndNavigate('HomeScreen')
  }

  if (authData) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      goToHome()
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync()
    firebase.database().ref(`/users/${authData.uid}/token`).set(token)
    goToHome()
  }
}
