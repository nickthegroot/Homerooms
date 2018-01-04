import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import Video from 'react-native-video'

import Button from './Components/Button'
import BackgroundVideo from '../../Images/BackgroundVideo.mp4'

import Styles from './Styles/LaunchStyles'

class LaunchScreen extends Component {
  render () {
    return (
      <View style={Styles.mainComponent}>

        <Video
          source={BackgroundVideo}
          rate={1.0}
          muted
          resizeMode={'cover'}
          repeat
          style={Styles.video}
        />

        <View style={Styles.overlay} />

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 20, color: '#FFFFFF', letterSpacing: 1.25 }}>Lake Oswego High School's</Text>
          <View style={{ width: 275, height: 4, backgroundColor: '#3B5998' }} />
          <Text style={{ fontFamily: 'Lato-Bold', fontSize: 52, color: '#FFFFFF' }}>Support Seminar<Text style={{ fontFamily: 'Lato-Bold', fontSize: 52, color: '#1E88E5' }}>.</Text></Text>
        </View>

        {/* Footer */}
        <View style={Styles.bottomButton}>
          <Button text={'Let\'s get started'} />
        </View>

      </View>
    )
  }
}

export default LaunchScreen
