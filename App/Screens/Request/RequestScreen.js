// @flow
import React from 'react'
import { ScrollView, View } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { DateTime } from 'luxon'
import RequestTeacherPopup from '../Components/RequestTeacherPopup'

import type { Teacher } from '../../Types/DatabaseTypes'
import type Firebase from 'react-native-firebase'

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
export default class RequestScreen extends React.Component<Props, {nextSeminar: DateTime, teachers: []}> {
  constructor (props: Props) {
    super(props)
    let nextSeminarTuesday = DateTime.local().set({ weekday: 2, hour: 12, minute: 30 })
    let nextSeminarWednesday = DateTime.local().set({ weekday: 3, hour: 12, minute: 30 })

    let nextSeminar = (nextSeminarTuesday > nextSeminarWednesday)
      ? nextSeminarTuesday
      : nextSeminarWednesday

    this.state = {
      nextSeminar: nextSeminar,
      teachers: null,
      requestVisibility: false,
      requestedTeacher: null
    }
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.teachers) {
      this.setState({
        teachers: nextProps.teachers
      })
    }
  }

  render () {
    var teacherList = []

    if (this.state.teachers) {
      for (let teacherItem of this.state.teachers) {
        if (teacherItem.key !== this.props.profile.defaultSeminar) {
          let teacher: Teacher = teacherItem.value
          let teacherPic: {uri: string} = ('picture' in teacher) ? { uri: teacher.picture } : null
          teacherList.push(
            <ListItem
              roundAvatar
              avatar={teacherPic}
              onPressRightIcon={
                function () {
                  this.setState({
                    requestVisibility: true,
                    requestedTeacher: teacher
                  })
                }.bind(this)
              }
              key={teacherItem.key}
              title={`${teacher.firstName} ${teacher.lastName}`}
              subtitle={`${teacher.taughtCourses} | Room ${teacher.room}`} />
            )
        }
      }
    }

    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <List>
            {teacherList}
          </List>
        </ScrollView>
        {/* <RequestTeacherPopup
          isVisible={this.state.requestVisibility}
          requestedTeacher={this.state.requestedTeacher}
          onFinish={() => this.setState({ requestVisibility: false })} /> */}
      </View>
    )
  }
}
