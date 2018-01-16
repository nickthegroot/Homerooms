// @flow

import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { ListItem } from 'react-native-elements'
import { DateTime } from 'luxon'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import filter from 'lodash.filter'
import handleRequest from '../../Services/requestTeacher'

import Styles from './Styles/SearchStyles'
import type { Teacher } from '../../Types/DatabaseTypes'

const mapStateToProps = state => {
  return {
    searchQuery: state.nav.searchQuery,
    teachers: state.firebase.data.teachers
  }
}

@firebaseConnect(props => [
  { type: 'once', path: '/teachers', queryParams: ['orderByChild=lastName'] }
])
@connect(mapStateToProps)
class SearchScreen extends Component {
  state = {
    matches: null
  }

  constructor (props) {
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

  componentWillReceiveProps (nextProps) {
    if (nextProps.searchQuery) {
      let query = nextProps.searchQuery.toLowerCase()
      let matches = filter(nextProps.teachers, (teacher) => {
        return (teacher.firstName.toLowerCase().includes(query) || teacher.lastName.toLowerCase().includes(query) || teacher.room.toString().includes(query))
      })

      this.setState({
        matches: matches
      })
    }
  }

  render () {
    let teacherCards = []

    for (let result in this.state.matches) {
      let teacher: Teacher = this.state.matches[result]
      let teacherPic = ('picture' in teacher) ? { uri: teacher.picture } : null
      teacherCards.push(
        <ListItem
          roundAvatar
          avatar={teacherPic}
          onPressRightIcon={function () {
            Alert.alert(
                'Are you sure?',
                `You're requesting ${teacher.firstName} ${teacher.lastName} for ${this.state.nextSeminar.toLocaleString(DateTime.DATE_HUGE)}.`,
              [
                  { text: 'Yes', onPress: () => { this.props.firebase.updateProfile(handleRequest(teacher.id, this.state.nextSeminar, this.props.firebase.auth()._user.uid)) } },
                  { text: 'No' }
              ],
                { cancelable: false }
              )
          }.bind(this)
            }
          key={teacher.id}
          title={`${teacher.firstName} ${teacher.lastName}`}
          subtitle={`${teacher.taughtCourses} | Room ${teacher.room}`} />
        )
    }

    return (
      <View style={Styles.mainContainer}>
        {teacherCards}
      </View>
    )
  }
}

export default SearchScreen
