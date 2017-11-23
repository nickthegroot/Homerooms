import React, { Component } from 'react'
import { View, ScrollView, Text, Alert } from 'react-native'
import { Card, CardTitle, CardAction, CardButton } from 'react-native-material-cards'
import { firebaseConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import Mailer from 'react-native-mail'
import Moment from 'moment'

import { firebaseProfilePopulates } from '../Config/FirebaseConfig'

import { Colors } from '../Themes'
import Styles from './Styles/HomeScreenStyles'

@firebaseConnect()
@connect(({ firebase }) => ({
  profile: firebase.profile,
  populatedProfile: populate(firebase, 'profile', firebaseProfilePopulates)
}))
export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: Moment().format('dddd, MMMM Do'),
      nextSeminar: Moment().endOf('day').fromNow() // TODO: Change to actual next seminar
    }
  }

  handleEmail = (email: string) => {
    Mailer.mail({
      subject: 'Support Seminar Help',
      recipients: [email]
    }, (error, event) => {
      Alert.alert(  // TODO: Handle error
        error,
        event,
        [
          { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
          { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
        ],
        { cancelable: true }
      )
    })
  }

  render () {
    return (
      <ScrollView style={Styles.mainContainer}>
        <View style={Styles.container}>
          <Text style={Styles.titleText}>Welcome back, {this.props.profile.name}</Text>
          <View style={Styles.break} />
          <View>
            <Text style={Styles.summaryText}>Today is {this.state.date}</Text>
            <Text style={Styles.summaryText}>The next Support Seminar is {this.state.nextSeminar}</Text>
          </View>
          <View style={Styles.break} />

          { (this.props.populatedProfile.defaultSeminar) ? (
            <Card>
              <CardTitle
                title='Your Next Support Seminar'
                subtitle={this.props.populatedProfile.defaultSeminar.name + ' | Room ' + this.props.populatedProfile.defaultSeminar.room}
                avatarSource={{ uri: this.props.populatedProfile.defaultSeminar.picture }}
              />
              <CardAction
                separator
                inColumn={false}>
                <CardButton
                  onPress={() => { this.handleEmail(this.props.populatedProfile.defaultSeminar.email) }}
                  title='E-Mail'
                  color={Colors.blue}
                />
              </CardAction>
            </Card>
          ) : null }

        </View>
      </ScrollView>
    )
  }
}
