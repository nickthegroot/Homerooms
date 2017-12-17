// @flow
import * as React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import Firebase from 'react-native-firebase'
import { firebaseConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import Mailer from 'react-native-mail'
import Moment from 'moment'

import { firebaseProfilePopulates } from '../../Config/FirebaseConfig'
import CurrentSeminarCard from './Components/CurrentSeminarCard'
import TitleText from './Components/TitleText'

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

type Request = {
  user: string, // We only really care about the UID
  pushID?: string,
  teacher: string, // First comes in as key
  accepted: boolean,
  timestamp: string,
  requestDate: string
}

type Props = {
  profile: {
    defaultSeminar: string,
    name: string,
    lastRequest: string
  },
  populatedProfile: {
    defaultSeminar: ?Teacher,
    name: string,
    schoolID: string,
    lastRequest: Request
  },
  firebase: any
}

type State = {
  seminarTeacher: ?Teacher
}

@firebaseConnect()
@connect(({ firebase }) => ({
  profile: firebase.profile,
  populatedProfile: populate(firebase, 'profile', firebaseProfilePopulates)
}))
export default class HomeScreen extends React.Component<Props, State> {
  state = {
    seminarTeacher: undefined
  }

  componentWillReceiveProps (nextProps: Props) {
    let nextSeminarTuesday = Moment().day(7 + 2).hour(12).minute(30)
    let nextSeminarWednesday = Moment().day(7 + 3).hour(12).minute(30)

    let nextSeminar = (nextSeminarTuesday.isBefore(nextSeminarWednesday))
      ? nextSeminarTuesday
      : nextSeminarWednesday

      // TODO: Attach a requsted timestamp onto every reqest
    if (nextProps.populatedProfile.lastRequest &&
      nextProps.populatedProfile.lastRequest.accepted &&
      nextProps.populatedProfile.lastRequest.teacher &&
      Moment(nextProps.populatedProfile.lastRequest.requestDate).isBefore(nextSeminar)) {
      Firebase.database().ref('teachers/' + nextProps.populatedProfile.lastRequest.teacher).once('value', function (teacherSnapshot) {
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
        Firebase.crash().log('Mailer Error on HomeScreen')
        Firebase.crash().report(error)
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
    let nextSeminarTuesday = Moment().day(7 + 2).hour(12).minute(30)
    let nextSeminarWednesday = Moment().day(7 + 3).hour(12).minute(30)

    let nextSeminar = (nextSeminarTuesday.isBefore(nextSeminarWednesday))
    ? nextSeminarTuesday
    : nextSeminarWednesday

    return (
      <ScrollView style={Styles.mainContainer}>
        <View style={Styles.container}>
          <TitleText date={date} name={this.props.populatedProfile.name} nextSeminar={nextSeminar.fromNow()} />
          <View style={Styles.break} />

          <CurrentSeminarCard seminarTeacher={this.state.seminarTeacher} />

        </View>
      </ScrollView>
    )
  }
}
