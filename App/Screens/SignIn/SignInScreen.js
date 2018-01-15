import React, { Component } from 'react'
import { View } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { firebaseConnect } from 'react-redux-firebase'
import Firebase from 'react-native-firebase'
import { NavigationActions } from 'react-navigation'
import Video from 'react-native-video'

import Button from '../Components/Button'
import BackgroundVideo from '../../Assets/Images/BackgroundVideo2.mp4'

import Styles from './Styles/SignInStyles'

@firebaseConnect()
class SignInScreen extends Component {
  constructor (props) {
    super(props)

    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleError = this.handleError.bind(this)
    this.state = {
      emailError: null,
      passwordError: null,
      email: null,
      password: null
    }

    // Checks to see if the user is logged in - and if so redirect them to HomeScreen
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

  handleSignIn () {
    this.props.firebase.login({email: this.state.email, password: this.state.password})
      .then(() => this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'TabNav' }, this.props.teachers)
        ]
      })))
      .catch((error) => {
        this.handleError(error)
      })
  }

  handleError (error) {
    console.tron.error(error)
    switch (error.code) {
      case 'auth/invalid-email':
        this.setState({ emailError: <FormValidationMessage>{'An invalid email was entered. Please check again.'}</FormValidationMessage> })
        break
      case 'auth/wrong-password':
        this.setState({ passwordError: <FormValidationMessage>{'The provided password does not match. Please check agian.'}</FormValidationMessage> })
        break
      default:
        if (!__DEV__) {
          Firebase.crash().log('Auth Error: Unknown Error Code')
          Firebase.crash().report(error)
        }
        break
    }
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
          <View style={Styles.form}>
            <FormLabel>E-Mail</FormLabel>
            <FormInput
              autoCapitalize='none'
              keyboardType='email-address'
              placeholder='Please enter your e-mail...'
              onChangeText={email => this.setState({ emailError: null, email: email })}
              shake={this.state.emailError}
          />
            {this.state.emailError}
            <FormLabel>Password</FormLabel>
            <FormInput
              autoCapitalize='none'
              secureTextEntry
              placeholder='Please enter your password...'
              onChangeText={password => this.setState({ password: password })}
              shake={this.state.passwordError}
          />
            {this.state.passwordError}
          </View>
        </View>

        {/* Footer */}
        <View style={Styles.bottomButton}>
          <Button text={'Log In'} onPress={this.handleSignIn} />
        </View>

      </View>
    )
  }
}

export default SignInScreen
