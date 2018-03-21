// @flow
import * as React from 'react'
import { View, ScrollView, Alert, ActivityIndicator } from 'react-native'
import Firebase from 'react-native-firebase'
import { firebaseConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import Mailer from 'react-native-mail'
import { getBothSeminars } from '../../Services/getNextSeminar'
import Moment from 'moment'

import { firebaseProfilePopulates } from '../../Config/FirebaseConfig'
import type { Teacher, Request } from '../../Types/DatabaseTypes'
import CurrentSeminarCard from '../Components/CurrentSeminarCard'

import Styles from './Styles/HomeScreenStyles'

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
    seminarTeachers: [ null, null ]
  }

  componentWillReceiveProps (nextProps: Props) {
    let nextSeminars = getBothSeminars()

    if (!nextProps.populatedProfile.isEmpty && nextProps.populatedProfile.isLoaded) {
      if (nextProps.populatedProfile.lastRequest) {
        let requestedTime = Moment(nextProps.populatedProfile.lastRequest.requestedTime)
        if (
          nextProps.populatedProfile.lastRequest.accepted &&
          nextProps.populatedProfile.lastRequest.teacher &&
          (requestedTime.isSame(nextSeminars[0]) || requestedTime.isSame(nextSeminars[1]))
        ) {
          Firebase.database().ref('teachers/' + nextProps.populatedProfile.lastRequest.teacher).once('value', function (teacherSnapshot) {
            this.setState({
              seminarTeachers: (nextProps.populatedProfile.lastRequest.day === 'A') ? [teacherSnapshot.val(), nextProps.populatedProfile.seminars.b] : [nextProps.populatedProfile.seminars.a, teacherSnapshot.val()]
            })
          }.bind(this))
          return
        }
      }
      this.setState({
        seminarTeachers: [nextProps.populatedProfile.seminars.a, nextProps.populatedProfile.seminars.b]
      })
    }
  }

  handleEmail = (email: string) => {
    Mailer.mail({
      subject: 'Homeroom Help',
      recipients: [email]
    }, (error, event) => {
      if (!__DEV__) {
        Firebase.fabric.crashlytics().log('Mailer Error on HomeScreen')
        Firebase.fabric.crashlytics().recordError(100, error)
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
    let bothSeminars = getBothSeminars()
    return (
      <ScrollView style={Styles.mainContainer}>
        <View style={Styles.container}>
          {!(this.props.populatedProfile.isLoaded)
            ? <ActivityIndicator size='large' animating={!this.props.firebase.isLoaded} />
            : null }
          <CurrentSeminarCard day='A' seminarTeacher={this.state.seminarTeachers[0]} onClick={this.handleEmail} nextDay={bothSeminars[0]} />
          <CurrentSeminarCard day='B' seminarTeacher={this.state.seminarTeachers[1]} onClick={this.handleEmail} nextDay={bothSeminars[1]} />
        </View>
      </ScrollView>
    )
  }
}
