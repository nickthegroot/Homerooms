import React, { Component } from 'react'
import { View } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { firebaseConnect } from 'react-redux-firebase'
import { Video } from 'expo'

import Button from '../../Components/Button'

import { Fonts } from '../../../Extras/Themes'
import Styles from './Styles'

@firebaseConnect()
export default class LoginScreen extends Component {
    constructor(props) {
        super(props)

        this.handleSignIn = this.handleSignIn.bind(this)
        this.handleError = this.handleError.bind(this)
        this.state = {
            emailError: null,
            passwordError: null,
            email: null,
            password: null
        }
    }

    handleSignIn() {
        this.props.firebase.login({ email: this.state.email, password: this.state.password })
            .catch((error) => {
                this.handleError(error)
            })
    }

    handleError(error) {
        switch (error.code) {
            case 'auth/invalid-email':
                this.setState({ emailError: <FormValidationMessage>{'An invalid email was entered. Please check again.'}</FormValidationMessage> })
                break
            case 'auth/wrong-password':
                this.setState({ passwordError: <FormValidationMessage>{'The provided password does not match. Please check agian.'}</FormValidationMessage> })
                break
            default:
                this.setState({ emailError: <FormValidationMessage>{'Something strange happened. Please try again.'}</FormValidationMessage> })
                break
        }
    }

    render() {
        return (
            <View style={Styles.mainContainer}>

                <Video
                    shouldPlay
                    source={require('../../../Extras/Assets/Videos/BackgroundVideo2.mp4')}
                    rate={1.0}
                    resizeMode={Video.RESIZE_MODE_COVER}
                    isMuted
                    isLooping
                    style={Styles.video}
                />

                <View style={Styles.overlay} />

                <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={Styles.form}>
                        <FormLabel containerStyle={Styles.formLabelContainer} labelStyle={Styles.formLabelText} fontFamily={Fonts.type.content}>E-Mail</FormLabel>
                        <FormInput
                            inputStyle={Styles.formInputText}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            onChangeText={email => this.setState({ emailError: null, email: email })}
                            shake={this.state.emailError} />
                        {this.state.emailError}
                        <FormLabel containerStyle={Styles.formLabelContainer} labelStyle={Styles.formLabelText} fontFamily={Fonts.type.content}>Password</FormLabel>
                        <FormInput
                            inputStyle={Styles.formInputText}
                            autoCapitalize='none'
                            secureTextEntry
                            onChangeText={password => this.setState({ passwordError: null, password: password })}
                            shake={this.state.passwordError} />
                        {this.state.passwordError}
                    </View>
                </View>

                {/* Footer */}
                <View style={{ flex: 1, justifyContent: 'center', height: this.state.width, margin: 20 }}>
                    <Button text={'Log In'} onPress={this.handleSignIn} />
                </View>

            </View>
        )
    }
}
