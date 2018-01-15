// @flow

import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { ListItem } from 'react-native-elements'
import { DateTime } from 'luxon'
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import filter from 'lodash.filter'

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
      if ('picture' in teacher) {
        teacherCards.push(
          <ListItem
            roundAvatar
            avatar={{ uri: teacher.picture }}
            onPressRightIcon={function () {
              Alert.alert(
                'Are you sure?',
                `You're requesting ${teacher.firstName} ${teacher.lastName} for ${this.state.nextSeminar.toLocaleString(DateTime.DATE_HUGE)}.`,
                [
                  { text: 'Yes', onPress: () => { this.handleRequest(teacher.id) } },
                  { text: 'No' }
                ],
                { cancelable: false }
              )
            }.bind(this)
            }
            key={teacher.id}
            title={`${teacher.firstName} ${teacher.lastName}`}
            subtitle={`${teacher.taughtCourses} | Room ${teacher.room}`}
          />
        )
      } else {
        teacherCards.push(
          <ListItem
            roundAvatar
            onPressRightIcon={function () {
              Alert.alert(
                'Are you sure?',
                `You're requesting ${teacher.firstName} ${teacher.lastName} for ${this.state.nextSeminar.toLocaleString(DateTime.DATE_HUGE)}.`,
                [
                  { text: 'Yes', onPress: () => { this.handleRequest(teacher.id) } },
                  { text: 'No' }
                ],
                { cancelable: false }
              )
            }.bind(this)
            }
            key={teacher.id}
            title={`${teacher.firstName} ${teacher.lastName}`}
            subtitle={`${teacher.taughtCourses} | Room ${teacher.room}`}
          />
        )
      }
    }

    return (
      <View style={Styles.mainContainer}>
        {teacherCards}
      </View>
    )
  }
}

export default SearchScreen
