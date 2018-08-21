import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Video } from 'expo'

import Button from '../../Components/Button'

import Styles from './Styles'

class LaunchScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      width: Dimensions.get('window').width
    }
  }

  onPressStarted = () => {
    this.props.navigation.navigate('LoginScreen')
  }

  render () {
    return (
      <View style={Styles.mainComponent}>

        <Video
          shouldPlay
          source={require('../../../Extras/Assets/Videos/BackgroundVideo.mp4')}
          rate={1.0}
          resizeMode={Video.RESIZE_MODE_COVER}
          isMuted
          isLooping
          style={Styles.video}
        />

        <View style={Styles.overlay} />

        <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', width: this.state.width }}>
          <Text style={Styles.supportSeminarTitleWhite}>Homerooms<Text style={Styles.supportSeminarTitleBlue}>.</Text></Text>
        </View>

        {/* Footer */}
        <View style={{ flex: 1, justifyContent: 'center', height: this.state.width, margin: 20 }}>
          <Button text={'Let\'s get started'} onPress={this.onPressStarted} />
        </View>

      </View>
    )
  }
}

export default LaunchScreen
