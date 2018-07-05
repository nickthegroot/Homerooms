import React from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { Font } from 'expo'
import Sentry from 'sentry-expo'
import store from './Extras/Redux'

import Styles from './RootContainerStyles'
import Navigation from './Extras/Navigation/AppNavigation'

Sentry.config('https://36afc4db76d8467b9c6e4a4f86522796@sentry.io/1236299').install()

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fontsLoaded: false
    }
  }

  async componentDidMount () {
    // As the app starts, it's a good idea to load all the fonts.
    await Font.loadAsync({
      'JosefinSlab-Bold': require('./Extras/Assets/Fonts/JosefinSlab-Bold.ttf'),
      'JosefinSlab-Italic': require('./Extras/Assets/Fonts/JosefinSlab-Italic.ttf'),
      'JosefinSlab-Light': require('./Extras/Assets/Fonts/JosefinSlab-Light.ttf'),
      'JosefinSlab-Regular': require('./Extras/Assets/Fonts/JosefinSlab-Regular.ttf'),
      'JosefinSlab-Thin': require('./Extras/Assets/Fonts/JosefinSlab-Thin.ttf'),
      'Nunito-Bold': require('./Extras/Assets/Fonts/Nunito-Bold.ttf'),
      'Nunito-Italic': require('./Extras/Assets/Fonts/Nunito-Italic.ttf'),
      'Nunito-Light': require('./Extras/Assets/Fonts/Nunito-Light.ttf'),
      'Nunito-Regular': require('./Extras/Assets/Fonts/Nunito-Regular.ttf'),
      'Nunito-SemiBold': require('./Extras/Assets/Fonts/Nunito-SemiBold.ttf')
    })

    this.setState({ fontsLoaded: true })
  }

  render () {
    return (
      <Provider store={store}>
        <View style={Styles.applicationView}>
          <StatusBar barStyle='light-content' />
          {this.state.fontsLoaded ? <Navigation /> : null}
        </View>
      </Provider>
    )
  }
}
