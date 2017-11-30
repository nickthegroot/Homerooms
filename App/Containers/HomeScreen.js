// @flow
import * as React from 'react'
import { View, ScrollView, Text, Alert } from 'react-native'
import { Card, CardTitle, CardAction, CardButton } from 'react-native-material-cards'
import firebase from 'react-native-firebase'
import { firebaseConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import Mailer from 'react-native-mail'
import Moment from 'moment'

import { firebaseProfilePopulates } from '../Config/FirebaseConfig'

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
  constructor (props) {
    super(props)
    this.state = {
      seminarTeacher: undefined
    }
  }

  componentWillReceiveProps (nextProps) {
    console.tron.log(nextProps)
    if (nextProps.populatedProfile.lastRequest && nextProps.populatedProfile.lastRequest.accepted && nextProps.populatedProfile.lastRequest.teacher) {
      firebase.database().ref('teachers/' + nextProps.populatedProfile.lastRequest.teacher).once('value', function (teacherSnapshot) {
        this.setState({
          seminarTeacher: teacherSnapshot.val()
        })
      }.bind(this))
    } else {
      this.setState({
        seminarTeacher: nextProps.populatedProfile.defaultSeminar
      })
    }
  }

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

    if (this.state.seminarTeacher && 'picture' in this.state.seminarTeacher) {
      cardTitle_ = <CardTitle
        title='Your Next Support Seminar'
        subtitle={this.state.seminarTeacher.lastName + ' | Room ' + this.state.seminarTeacher.room}
        avatarSource={{ uri: this.state.seminarTeacher.picture }}
        />
    } else if (this.state.seminarTeacher) {
      cardTitle_ = <CardTitle
        title='Your Next Support Seminar'
        subtitle={this.state.seminarTeacher.lastName + ' | Room ' + this.state.seminarTeacher.room}
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

          {(this.state.seminarTeacher)
          ? (
            <Card>
              {cardTitle_}
              <CardAction
                separator
                inColumn={false}>
                <CardButton
                  onPress={() => { if (this.state.seminarTeacher) { this.handleEmail(this.state.seminarTeacher.email) /* Need to do this because of Flow bug. */ } }}
                  title='E-Mail'
                  color={Colors.blue}
                  />
              </CardAction>
            </Card>
          )
          : null }

        </View>
      </ScrollView>
    )
  }
}
