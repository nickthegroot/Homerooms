// @flow
import React from 'react'
import { ScrollView, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import RequestTeacherPopup from '../Components/RequestTeacherPopup'
import { getNextSeminar } from '../../Services/getNextSeminar'

import type { Teacher } from '../../Types/DatabaseTypes'
import type Firebase from 'react-native-firebase'

// Styles
import styles from './Styles/RequestScreenStyles'
import { Fonts } from '../../Themes'

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

    this.state = {
      nextSeminar: getNextSeminar(),
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

    if (this.state.teachers && !this.props.profile.isEmpty) {
      for (let teacherItem of this.state.teachers) {
        if (teacherItem.key !== this.props.profile.seminars.a || teacherItem.key !== this.props.profile.seminars.b) {
          let teacher: Teacher = teacherItem.value
          let teacherPic: {uri: string} = ('picture' in teacher) ? { uri: teacher.picture } : null
          teacherList.push(
            <ListItem
              roundAvatar
              fontFamily={Fonts.type.content}
              avatar={teacherPic}
              containerStyle={{ borderBottomWidth: 0 }}
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
          {teacherList}
        </ScrollView>
        <RequestTeacherPopup
          isVisible={this.state.requestVisibility}
          requestedTeacher={this.state.requestedTeacher}
          onFinish={() => this.setState({ requestVisibility: false })} />
      </View>
    )
  }
}
