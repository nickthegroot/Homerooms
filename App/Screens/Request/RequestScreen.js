// @flow
import React from 'react'
import { ScrollView, Alert, Platform } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { DateTime } from 'luxon'
import Firebase from 'react-native-firebase'

import type { Teacher } from '../../Types/DatabaseTypes'

// Styles
import styles from './Styles/RequestScreenStyles'

type Props = {
  teachers: [],
  firebase: Firebase
}

@firebaseConnect(props => [
  { type: 'once', path: '/teachers', queryParams: ['orderByChild=lastName'] }
])
@connect(({ firebase }) => ({
  teachers: firebase.ordered.teachers,
  profile: firebase.profile
}))
export default class RequestScreen extends React.Component<Props, {nextSeminar: any, teachers: []}> {
  constructor (props: Props) {
    super(props)
    let nextSeminarTuesday = DateTime.local().set({ weekday: 2, hour: 12, minute: 30 }) // day(7 + 2).hour(12).minute(30)
    let nextSeminarWednesday = DateTime.local().set({ weekday: 3, hour: 12, minute: 30 })

    let nextSeminar = (nextSeminarTuesday > nextSeminarWednesday)
      ? nextSeminarTuesday
      : nextSeminarWednesday

    this.state = {
      nextSeminar: nextSeminar
    }
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.teachers) {
      this.setState({
        teachers: nextProps.teachers
      })
    }
  }

  handleRequest = (teacherKey: string) => {
    try {
    // TODO: Change when Push Notifications are enabled on iOS.
      if (Platform.OS === 'android') {
        Firebase.messaging().getToken().then((token) => {
          let requestRef = Firebase.database().ref('/requests').push({
            user: this.props.firebase.auth()._user.uid,
            pushID: token,
            teacher: teacherKey,
            accepted: false,
            timestamp: DateTime.local.toString(),
            requestedTime: this.state.nextSeminar.toString()
          })
          this.props.firebase.updateProfile({ lastRequest: requestRef.key })
        })
      } else {
        let requestRef = Firebase.database().ref('/requests').push({
          user: this.props.firebase.auth()._user.uid,
          teacher: teacherKey,
          accepted: false,
          timestamp: DateTime.local.toString(),
          requestedTime: this.state.nextSeminar.toString()
        })
        this.props.firebase.updateProfile({ lastRequest: requestRef.key })
      }
    } catch (err) {
      if (!__DEV__) {
        Firebase.crash().log('Push to Database Error on RequestScreen')
        Firebase.crash().report(err)
      } else {
        console.tron.log(err)
      }

      Alert.alert(
        'Error',
        'An error occured when trying to submit your request. Please try again.',
        [
          { text: 'OK' }
        ],
        { cancelable: true }
      )
    }
  }

  render () {
    var teacherList = []

    if (this.state.teachers) {
      for (let teacherItem of this.state.teachers) {
        if (teacherItem.key !== this.props.profile.defaultSeminar) {
          let teacher: Teacher = teacherItem.value
          if ('picture' in teacher) {
            teacherList.push(
              <ListItem
                roundAvatar
                avatar={{ uri: teacher.picture }}
                onPressRightIcon={function () {
                  Alert.alert(
                    'Are you sure?',
                    `You're requesting ${teacher.firstName} ${teacher.lastName} for ${this.state.nextSeminar.toLocalString(DateTime.DATE_HUGE)}.`,
                    [
                      { text: 'Yes', onPress: () => { this.handleRequest(teacherItem.key) } },
                      { text: 'No' }
                    ],
                    { cancelable: false }
                      )
                }.bind(this)
                }
                key={teacherItem.key}
                title={`${teacher.firstName} ${teacher.lastName}`}
                subtitle={`${teacher.taughtCourses} | Room ${teacher.room}`}
            />
            )
          } else {
            teacherList.push(
              <ListItem
                onPressRightIcon={
              function () {
                Alert.alert(
                  'Are you sure?',
                  `You're requesting ${teacher.firstName} ${teacher.lastName} for ${this.state.nextSeminar.toLocalString(DateTime.DATE_HUGE)}.`,
                  [
                    { text: 'Yes', onPress: () => { this.handleRequest(teacherItem.key) } },
                    { text: 'No' }
                  ],
                  { cancelable: false }
                )
              }.bind(this)
            }
                key={teacherItem.key}
                title={`${teacher.firstName} ${teacher.lastName}`}
                subtitle={`${teacher.taughtCourses} | Room ${teacher.room}`}
              />
            )
          }
        }
      }
    }

    return (
      <ScrollView style={styles.mainContainer}>
        <List>
          {teacherList}
        </List>
      </ScrollView>
    )
  }
}
