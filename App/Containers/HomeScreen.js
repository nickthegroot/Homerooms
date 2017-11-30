// @flow
import * as React from 'react'
import { View, ScrollView, Text, Alert } from 'react-native'
import { Card, CardTitle, CardAction, CardButton } from 'react-native-material-cards'
import * as firebase from 'react-native-firebase'
import { firebaseConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import Mailer from 'react-native-mail'
import Moment from 'moment'

import { firebaseProfilePopulates, firebaseRequestPopulates } from '../Config/FirebaseConfig'

import { Colors } from '../Themes'
import Styles from './Styles/HomeScreenStyles'

type Teacher = {
  email: string,
  firstName: string,
  id: string,
  lastName: string,
  room: string | number,
  taughtCourses: string,
  picture?: string
}

type Props = {
  profile: {
    defaultSeminar: string,
    name: string,
    schoolID: string
  },
  populatedProfile: {
    defaultSeminar: ?Teacher,
    name: string,
    schoolID: string
  },
  firebase: any
}

@firebaseConnect()
@connect(({ firebase }) => ({
  profile: firebase.profile,
  populatedProfile: populate(firebase, 'profile', firebaseProfilePopulates)
}))
export default class HomeScreen extends React.Component<Props> {
  handleEmail = (email: string) => {
    Mailer.mail({
      subject: 'Support Seminar Help',
      recipients: [email]
    }, (error, event) => {
      if (!__DEV__) {
        firebase.crash().log('Mailer Error on HomeScreen')
        firebase.crash().report(error)
      }

      Alert.alert(
        'Error',
        'An error occured when trying to launch the email app.',
        [
          { text: 'OK' }
        ],
        { cancelable: true }
      )
    })
  }

  render () {
    let date = Moment().format('dddd, MMMM Do')
    let nextSeminar = Moment().endOf('day').fromNow()
    let cardTitle_: React.Node
    let cardButton_: React.Node

    if (this.props.populatedProfile.defaultSeminar && 'picture' in this.props.populatedProfile.defaultSeminar) {
      cardTitle_ = <CardTitle
          title='Your Next Support Seminar'
          subtitle={this.props.populatedProfile.defaultSeminar.lastName + ' | Room ' + this.props.populatedProfile.defaultSeminar.room}
          avatarSource={{ uri: this.props.populatedProfile.defaultSeminar.picture }}
        />
      cardButton_ = <CardButton
          onPress={() => { if (this.props.populatedProfile.defaultSeminar) { this.handleEmail(this.props.populatedProfile.defaultSeminar.email) /* Need to do this because of Flow bug. */ } }}
          title='E-Mail'
          color={Colors.blue}
        />
    } else if (this.props.populatedProfile.defaultSeminar) {
      cardTitle_ = <CardTitle
          title='Your Next Support Seminar'
          subtitle={this.props.populatedProfile.defaultSeminar.lastName + ' | Room ' + this.props.populatedProfile.defaultSeminar.room}
          avatarSource={{ uri: this.props.populatedProfile.defaultSeminar.picture }}
        />
      cardButton_ = <CardButton
          onPress={() => { if (this.props.populatedProfile.defaultSeminar) { this.handleEmail(this.props.populatedProfile.defaultSeminar.email) /* Need to do this because of Flow bug. */ } }}
          title='E-Mail'
          color={Colors.blue}
        />
    }

    return (
      <ScrollView style={Styles.mainContainer}>
        <View style={Styles.container}>
          <Text style={Styles.titleText}>Welcome back, {this.props.profile.name}</Text>
          <View style={Styles.break} />
          <View>
            <Text style={Styles.summaryText}>Today is {date}</Text>
            <Text style={Styles.summaryText}>The next Support Seminar is {nextSeminar}</Text>
          </View>
          <View style={Styles.break} />

          {(this.props.populatedProfile.defaultSeminar)
          ? (
            <Card>
              {cardTitle_}
              <CardAction
                separator
                inColumn={false}>
                { cardButton_ }
              </CardAction>
            </Card>
          )
          : null }

        </View>
      </ScrollView>
    )
  }
}
