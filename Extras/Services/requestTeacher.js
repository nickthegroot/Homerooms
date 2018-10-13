import Firebase from 'firebase'

export default function handleRequest (schoolID, teacherID, seminarDate, reason = '') {
  const uid = Firebase.auth().currentUser.uid

  Firebase.database().ref(`/schools/${schoolID}/requests/${uid}`).push({
    teacher: teacherID,
    accepted: false,
    viewed: false,
    timestamp: (new Date()).toISOString(),
    requestedTime: seminarDate.toISOString(),
    reason: reason
  })
}
