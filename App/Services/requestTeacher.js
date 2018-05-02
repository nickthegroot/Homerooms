// @flow

import Firebase from 'react-native-firebase'
import moment from 'moment'

function handleRequest (teacherKey: string, nextSeminar: moment, uid: string, day: 'A' | 'B', reason?: string) {
  try {
    Firebase.messaging().getToken().then((token) => {
      let requestRef = Firebase.database().ref('/requests').push({
        user: uid,
        pushID: token,
        teacher: teacherKey,
        accepted: false,
        denied: false,
        timestamp: moment().format(),
        requestedTime: nextSeminar.format(),
        day: day,
        reason: reason
      })
      Firebase.database().ref(`/users/${uid}/requests`).push(requestRef.key)
      Firebase.analytics.logEvent('requestTeacher', { teacher: teacherKey, day: day })
    })
  } catch (err) {
    if (!__DEV__) {
      Firebase.crash().log('Push to Database Error on RequestScreen')
      Firebase.crash().report(err)
    } else {
      console.tron.error(err)
    }

    throw err
  }
}

export default handleRequest
