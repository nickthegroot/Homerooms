import React from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { Font } from 'expo'
import store from './Redux'

import Styles from './RootContainerStyles'
import Navigation from './Navigation/AppNavigation'

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
      'JosefinSlab-Bold': require('./Assets/Fonts/JosefinSlab-Bold.ttf'),
      'JosefinSlab-Italic': require('./Assets/Fonts/JosefinSlab-Italic.ttf'),
      'JosefinSlab-Light': require('./Assets/Fonts/JosefinSlab-Light.ttf'),
      'JosefinSlab-Regular': require('./Assets/Fonts/JosefinSlab-Regular.ttf'),
      'JosefinSlab-Thin': require('./Assets/Fonts/JosefinSlab-Thin.ttf'),
      'Nunito-Bold': require('./Assets/Fonts/Nunito-Bold.ttf'),
      'Nunito-Italic': require('./Assets/Fonts/Nunito-Italic.ttf'),
      'Nunito-Light': require('./Assets/Fonts/Nunito-Light.ttf'),
      'Nunito-Regular': require('./Assets/Fonts/Nunito-Regular.ttf'),
      'Nunito-SemiBold': require('./Assets/Fonts/Nunito-SemiBold.ttf')
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
