import Firebase from 'firebase'

export default function handleRequest (schoolID, newTeacherID, oldTeacherID, seminarDate, reason = '') {
  const uid = Firebase.auth().currentUser.uid

  Firebase.database().ref(`/schools/${schoolID}/requests`).push({
    user: uid,
    newTeacher: newTeacherID,
    oldTeacher: oldTeacherID,
    accepted: false,
    viewed: false,
    timestamp: (new Date()).toISOString(),
    requestedTime: seminarDate.toISOString(),
    reason: reason
  })
}
