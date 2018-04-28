import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from '../Redux'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import codePush from 'react-native-code-push'

import Styles from './RootContainerStyles'

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */

@codePush
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <View style={Styles.applicationView}>
          <StatusBar barStyle='light-content' />
          <ReduxNavigation />
        </View>
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
