// @flow
import React from 'react'
import { ScrollView, View, Alert } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { NavigationActions } from 'react-navigation'

import type { Teacher } from '../../Types/DatabaseTypes'
import type Firebase from 'react-native-firebase'

// Styles
import styles from './Styles/ChangeScreenStyles'
import { Fonts } from '../../Themes'

type Props = {
    teachers: [],
    firebase: Firebase
}

@firebaseConnect(props => [
    { type: 'once', path: '/teachers', queryParams: ['orderByChild=lastName'] }
])
@connect(({ firebase, dayChange }) => ({
  teachers: firebase.ordered.teachers,
  profile: firebase.profile
}))
export default class ChangeScreen extends React.Component<Props, { nextSeminar: any, teachers: [] }> {
  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.teachers) {
      this.setState({
        teachers: nextProps.teachers
      })
    }
  }

  changeHomeroom = (teacherKey: string) => {
    let updatedProfile = (this.props.navigation.state.params.dayChange === 'A') ? { seminars: { a: teacherKey, b: this.props.profile.seminars.b } } : { seminars: { a: this.props.profile.seminars.a, b: teacherKey } }
    this.props.firebase.updateProfile(updatedProfile)
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'TabNav' })
      ]
    }))
  }

  render () {
    var teacherList = []

    if (this.props.teachers) {
      for (let teacherItem of this.props.teachers) {
        let teacher: Teacher = teacherItem.value
        let teacherPic: { uri: string } = ('picture' in teacher) ? { uri: teacher.picture } : null
        teacherList.push(
          <ListItem
            roundAvatar
            fontFamily={Fonts.type.content}
            avatar={teacherPic}
            containerStyle={{ borderBottomWidth: 0 }}
            onPressRightIcon={
              function () {
                Alert.alert(
                  'Are You Sure?',
                  'If you picked the wrong teacher, it could result in unexcused absances when you go to another Homeroom.',
                  [
                    { text: 'OK', onPress: () => this.changeHomeroom(teacherItem.key) },
                    { text: 'Cancel' }
                  ],
                  { cancelable: false }
                )
              }.bind(this)
            }
            key={teacherItem.key}
            title={`${teacher.firstName} ${teacher.lastName}`}
            subtitle={`${teacher.taughtCourses} | Room ${teacher.room}`} />
          )
      }
    }

    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          {teacherList}
        </ScrollView>
      </View>
    )
  }
}
