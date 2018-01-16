export const firebaseProfilePopulates = [{ child: 'lastRequest', root: 'requests' }, { child: 'seminars', root: 'teachers' }]
export const reduxFirebaseConfig = {
  userProfile: 'users',
  profileParamsToPopulate: firebaseProfilePopulates, // populate list of todos from todos ref
  enableRedirectHandling: false
}
