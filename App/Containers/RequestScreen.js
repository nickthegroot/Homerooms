// @flow
import * as React from 'react'
import { ScrollView, Alert } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Moment from 'moment'
import * as Firebase from 'react-native-firebase'

// Styles
import styles from './Styles/RequestScreenStyles'

type Teacher = {
  email: string,
  name: string,
  picture: string,
  room: string,
  subject: string
}

type Props = {
 teachers: {
   [key: string]: Teacher
  },
  firebase: {
    push: (path: string, data: {}) => any
  }
}

@firebaseConnect(
  { type: 'once', path: '/teachers' }
)
@connect(state => ({
  teachers: state.firebase.data.teachers
}))
export default class RequestScreen extends React.Component<Props> {
  render () {
    var teacherList = []
    for (let teacherKey in this.props.teachers) {
      let teacher: Teacher = this.props.teachers[teacherKey]
      teacherList.push(
        <ListItem
          roundAvatar
          avatar={{ uri: teacher.picture }}
          onPressRightIcon={
            function () {
              this.props.firebase
                .push('/requests', { teacher: teacherKey, accepted: false, timestamp: Moment().format() })
                .catch((err) => {
                  if (!__DEV__) {
                    Firebase.crash().log('Push to Database Error on RequestScreen')
                    Firebase.crash().report(err)
                  }

                  Alert.alert(
                    'Error',
                    'An error occured when trying to submit your request. Please try again.',
                    [
                      { text: 'OK' }
                    ],
                    { cancelable: true }
                  )
                })
            }.bind(this)
        }
          key={teacherKey}
          title={teacher.name}
          subtitle={teacher.subject + ' Teacher | Room ' + teacher.room}
        />
      )
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
