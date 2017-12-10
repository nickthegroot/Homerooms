import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { firebaseConnect } from 'react-redux-firebase'
import Firebase from 'react-native-firebase'
import { Images } from '../../Themes'
import { NavigationActions } from 'react-navigation'

import Styles from './Styles/SignInStyles'

@firebaseConnect()
class SignInScreen extends Component {
  constructor (props) {
    super(props)

    // Checks to see if the user is logged in - and if so redirect them to HomeScreen
    props.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'TabNav' }, props.teachers)
          ]
        }))
      }
    })

    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleError = this.handleError.bind(this)
    this.state = {
      emailError: null,
      passwordError: null,
      email: null,
      password: null
    }
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
    return <View style={Styles.mainContainer}>
      <Image source={{ uri: Images.logo }} />
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
        <Button
          onPress={this.handleSignIn}
          icon={{ name: 'done' }}
          buttonStyle={{ marginTop: 15 }}
          title='SUBMIT'
      />
      </View>
    </View>
  }
}

export default SignInScreen
