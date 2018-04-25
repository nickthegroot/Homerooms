// @flow
import filter from 'lodash.filter'
import React, { Component } from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { getNextSeminar } from '../../Services/getNextSeminar'
import { Fonts } from '../../Themes'
import RequestTeacherPopup from '../Components/RequestTeacherPopup'
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

    if (props.navigation.state.params) {
      props.navigation.state.params.focusSearch()
    }

    this.state = {
      nextSeminar: getNextSeminar(),
      matches: null,
      requestVisibility: false,
      requestedTeacher: null
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
          key={teacher.id}
          title={`${teacher.firstName} ${teacher.lastName}`}
          subtitle={`${teacher.taughtCourses} | Room ${teacher.room}`} />
        )
    }

    return (
      <View style={Styles.mainContainer}>
        <RequestTeacherPopup
          requestedTeacher={this.state.requestedTeacher}
          onFinish={() => this.setState({ requestVisibility: false })}
          isVisible={this.state.requestVisibility} />
        {teacherCards}
      </View>
    )
  }
}

export default SearchScreen
