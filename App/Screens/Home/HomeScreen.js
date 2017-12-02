// @flow
import * as React from 'react'
import { View, ScrollView, Text, Alert } from 'react-native'
import { Card, Button } from 'react-native-elements'
import firebase from 'react-native-firebase'
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

    return (
      <ScrollView style={Styles.mainContainer}>
        <View style={Styles.container}>
          <TitleText date={date} name={this.props.populatedProfile.name} nextSeminar={nextSeminar} />
          <View style={Styles.break} />

          <CurrentSeminarCard seminarTeacher={this.state.seminarTeacher} />

        </View>
      </ScrollView>
    )
  }
}
