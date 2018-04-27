// @flow
import React, { Component } from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { getNextSeminar } from '../../Services/getNextSeminar'
import { Fonts, Colors } from '../../Themes'
import RequestTeacherPopup from '../Components/RequestTeacherPopup'
import SearchBar from 'react-native-searchbar'
import Styles from './Styles/SearchStyles'

import type { Teacher } from '../../Types/DatabaseTypes'

const mapStateToProps = state => {
  return {
    teachers: state.firebase.data.teachers
  }
}

@firebaseConnect(props => [
  { type: 'once', path: '/teachers', queryParams: ['orderByChild=lastName'] }
])
@connect(mapStateToProps)
class SearchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nextSeminar: getNextSeminar(),
      teachers: null,
      loading: true,
      requestVisibility: false,
      requestedTeacher: null
    }
  }

  handleResults = (results) => {
    this.setState({ results: results })
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.loading && 'teachers' in nextProps) {
      let teachers = Object.values(nextProps.teachers)
      console.tron.log(teachers)
      this.setState({loading: false, teachers: teachers})
      this.searchBar.show()
    }
  }

  render () {
    let teacherCards = []

    for (let result in this.state.results) {
      let teacher: Teacher = this.state.results[result]
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
        <SearchBar
          ref={(ref) => (this.searchBar = ref)}
          data={this.state.teachers}
          handleResults={this.handleResults}
          fontFamily={Fonts.type.content}
          hideBack
          selectionColor={Colors.lightBlue}
          autoCorrect={false}
          iOSPadding={false}
        />
        <RequestTeacherPopup
          requestedTeacher={this.state.requestedTeacher}
          onFinish={() => this.setState({ requestVisibility: false })}
          isVisible={this.state.requestVisibility} />
        <View style={{ marginTop: 50 }}>
          {teacherCards}
        </View>
      </View>
    )
  }
}

export default SearchScreen
