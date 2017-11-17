export const firebaseProfilePopulates = [{ child: 'defaultSeminar', root: 'teachers' }]
export const reduxFirebaseConfig = {
  userProfile: 'users',
  profileParamsToPopulate: firebaseProfilePopulates // populate list of todos from todos ref
}
