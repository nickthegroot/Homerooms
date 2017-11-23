import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

// More info here: https://facebook.github.io/react-native/docs/sectionlist.html

// Styles
import styles from './Styles/RequestScreenStyles'

@firebaseConnect(
  { type: 'once', path: '/teachers' }
)
@connect(state => ({
  teachers: state.firebase.data.teachers
}))
export default class RequestScreen extends Component {
  render () {
    var teacherList = []
    for (let teacherKey in this.props.teachers) {
      let teacher = this.props.teachers[teacherKey]
      teacherList.push(
        <ListItem
          roundAvatar
          avatar={{ uri: teacher.picture }}
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
