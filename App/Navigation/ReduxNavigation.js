import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import { BackHandler, NavigationActions } from 'react-native'
import AppNavigation from './AppNavigation'

@connect((state) => ({
  nav: state.nav
}))
class ReduxNavigation extends React.Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }

  render () {
    const { dispatch, nav } = this.props
    const addListener = createReduxBoundAddListener('root')
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
      addListener
    })
    return <AppNavigation navigation={navigation} />
  }
}

export default ReduxNavigation
