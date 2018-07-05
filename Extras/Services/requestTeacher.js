import Firebase from 'firebase'

export default function handleRequest (schoolId, teacherKey, seminarDate, uid, reason) {
  Firebase.database().ref(`/${schoolId}/requests`).push({
    user: uid,
    teacher: teacherKey,
    accepted: false,
    viewed: false,
    timestamp: new Date(),
    requestedTime: seminarDate,
    reason: reason
  })
}
