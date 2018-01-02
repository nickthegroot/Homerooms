import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Video from 'react-native-video'

import Styles from './Styles/LaunchStyles'

class LaunchScreen extends Component {
  render () {
    return (
      <View style={Styles.mainContainer}>
        <Video
          repeat
          source={require('../../Images/BackgroundVideo.mp4')}
          resizeMode="cover"
          style={StyleSheet.absoluteFill} />
      </View>
    )
  }
}

export default LaunchScreen
