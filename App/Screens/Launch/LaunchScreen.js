import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions
} from 'react-native'
import Video from 'react-native-video'
import { firebaseConnect } from 'react-redux-firebase'

import Button from '../Components/Button'
import BackgroundVideo from '../../Assets/Videos/BackgroundVideo.mp4'

import Styles from './Styles/LaunchStyles'

@firebaseConnect()
class LaunchScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      width: Dimensions.get('window').width
    }

    Dimensions.addEventListener('change', (e) => {
      this.setState({width: e.window.width})
    })
  }

  onPressStarted = () => {
    this.props.navigation.navigate('SignInScreen')
  }

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

        <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', width: this.state.width }}>
          <Text style={Styles.lakeOswegoTitle}>Lake Oswego High School's</Text>
          <View style={Styles.line} />
          <Text style={Styles.supportSeminarTitleWhite}>Homeroom<Text style={Styles.supportSeminarTitleBlue}>.</Text></Text>
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
