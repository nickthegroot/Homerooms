import AppNavigation from '../Navigation/AppNavigation'

export const reducer = (state, action) => {
  switch (action.type) {
    case 'NAVIGATION/setQuery':
      return {...state, searchQuery: action.query}
    case 'NAVIGATION/setDayChange':
      return {...state, dayChange: action.day}
    default:
      const newState = AppNavigation.router.getStateForAction(action, state)
      return newState || state
  }
}
