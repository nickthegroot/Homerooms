import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import Video from 'react-native-video'
import { firebaseConnect } from 'react-redux-firebase'

import Button from '../Components/Button'
import BackgroundVideo from '../../Assets/Videos/BackgroundVideo.mp4'

import Styles from './Styles/LaunchStyles'

@firebaseConnect()
class LaunchScreen extends Component {
  constructor (props) {
    super(props)
    props.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'TabNav' })
          ]
        }))
      }
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

        <View style={Styles.contentView}>
          <Text style={Styles.lakeOswegoTitle}>Lake Oswego High School's</Text>
          <View style={Styles.line} />
          <Text style={Styles.supportSeminarTitleWhite}>Homeroom<Text style={Styles.supportSeminarTitleBlue}>.</Text></Text>
        </View>

        {/* Footer */}
        <View style={Styles.bottomButton}>
          <Button text={'Let\'s get started'} onPress={this.onPressStarted} />
        </View>

      </View>
    )
  }
}

export default LaunchScreen
