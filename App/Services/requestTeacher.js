// @flow

import Firebase from 'react-native-firebase'
import Moment from 'moment'
import { Platform, Alert } from 'react-native'

const handleRequest = (teacherKey: string, nextSeminar: any, uid: string, day: 'A' | 'B') => {
  var requestKey: { lastRequest: string } = {}
  try {
    // TODO: Change when Push Notifications are enabled on iOS.
    if (Platform.OS === 'android') {
      Firebase.messaging().getToken().then((token) => {
        let requestRef = Firebase.database().ref('/requests').push({
          user: uid,
          pushID: token,
          teacher: teacherKey,
          accepted: false,
          timestamp: Moment.format(),
          requestedTime: nextSeminar.toString(),
          day: day
        })
        requestKey = { lastRequest: requestRef.key }
      })
    } else {
      let requestRef = Firebase.database().ref('/requests').push({
        user: uid,
        teacher: teacherKey,
        accepted: false,
        timestamp: Moment.format(),
        requestedTime: nextSeminar.toString(),
        day: day
      })
      requestKey = { lastRequest: requestRef.key }
    }
    return requestKey
  } catch (err) {
    if (!__DEV__) {
      Firebase.crash().log('Push to Database Error on RequestScreen')
      Firebase.crash().report(err)
    } else {
      console.tron.log(err)
    }

    Alert.alert(
      'Error',
      'An error occured when trying to submit your request. Please try again.',
      [
        { text: 'OK' }
      ],
      { cancelable: true }
    )
  }
}

export default handleRequest
