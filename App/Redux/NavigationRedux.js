import AppNavigation from '../Navigation/AppNavigation'

export const reducer = (state, action) => {
  switch (action.type) {
    case 'setQuery':
      return {...state, searchQuery: action.query}
    default:
      const newState = AppNavigation.router.getStateForAction(action, state)
      return newState || state
  }
}
