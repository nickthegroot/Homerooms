export const firebaseProfilePopulates = [{ child: 'defaultSeminar', root: 'teachers' }, { child: 'lastRequest', root: 'requests' }]
export const reduxFirebaseConfig = {
  userProfile: 'users',
  profileParamsToPopulate: firebaseProfilePopulates, // populate list of todos from todos ref
  enableRedirectHandling: false
}
