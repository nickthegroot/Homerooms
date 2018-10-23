import React, { Component } from 'react'
import { Alert, ScrollView, View, ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'
import SearchBar from 'react-native-searchbar'
import { connect } from 'react-redux'
import { firebaseConnect, populate } from 'react-redux-firebase'
import RequestTeacherPopup from '../../Components/RequestTeacherPopup'
import Styles from './Styles'
import { Fonts, Colors } from '../../../Extras/Themes'
import { profilePopulates } from '../../../Extras/Config/FirebaseConfig'

@firebaseConnect()
@connect(
  ({ firebase }) => {
    return { profile: populate(firebase, 'profile', profilePopulates) }
  }
)
class SearchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      requestVisibility: false,
      requestedTeacher: null
    }
  }

  handleResults = (results) => {
    this.setState({ results: results })
  }

  handleFinish = (requestSent) => {
    let onConfirm = () => {
      this.setState({ requestVisibility: false })
      this.props.navigation.navigate('HomeScreen')
    }

    let teacher = this.state.requestedTeacher

    if (requestSent) {
      Alert.alert(
        'Success!',
        `Your request for ${teacher.name} has been sent. You'll recieve a notification when it is accepted or denied.`,
        [
          { text: 'OK', onPress: onConfirm }
        ],
        { cancelable: false }
      )
    }
  }

  formatTeachers = (teacherObj) => {
    return Object.keys(teacherObj).map(id => {
      return teacherObj[id]
    })
  }

  render () {
    // Before anything, give Firebase time
    if (!this.props.profile.isLoaded) {
      return (
        <View style={Styles.loadingView}>
          <ActivityIndicator size='large' animating />
        </View>
      )
    }

    let teacherCards = []

    for (let result in this.state.results) {
      let teacher = this.state.results[result]
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
          title={`${teacher.name}`}
          subtitle={`Room: ${teacher.room} | Specialty: ${teacher.specialty}`} />
      )
    }

    return (
      <View style={Styles.mainContainer}>
        <SearchBar
          showOnLoad
          data={this.formatTeachers(this.props.profile.school.teachers)}
          handleResults={this.handleResults}
          fontFamily={Fonts.type.content}
          hideBack
          selectionColor={Colors.lightBlue}
          autoCorrect={false}
          iOSPadding={false}
        />
        {
          (this.state.requestVisibility && this.props.profile.isLoaded)
            ? (<RequestTeacherPopup
              requestedTeacher={this.state.requestedTeacher}
              onFinish={this.handleFinish}
              profile={this.props.profile} />)
            : null
        }
        <ScrollView style={{ marginTop: 50 }}>
          {teacherCards}
        </ScrollView>
      </View>
    )
  }
}

export default SearchScreen
