import React, { Component } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { firebaseConnect, populate } from 'react-redux-firebase'
import CurrentSeminarCard from '../../Components/CurrentSeminarCard'
import { connect } from 'react-redux'
// import Firebase from 'firebase'
import { profilePopulates } from '../../../Extras/Config/FirebaseConfig'

import Styles from './Styles'

@firebaseConnect()
@connect(
  ({ firebase }) => {
    return { profile: populate(firebase, 'profile', profilePopulates) }
  }
)
export default class HomeScreen extends Component {
  getAndFormatTeachers = () => {
    const profile = this.props.profile

    let defaultTeacherCards = null
    let requestedTeacherCards = null

    if (!profile.isLoaded) { return null } // Sanity Check

    if (profile.defaultTeachers) {
      defaultTeacherCards = Object.keys(profile.defaultTeachers).map(defaultDay => {
        let teacherID = profile.defaultTeachers[defaultDay]
        let teacherProfile = profile.school.teachers[teacherID]

        return <CurrentSeminarCard key={teacherProfile.id} day={defaultDay} teacher={teacherProfile} />
      })
    }

    if (profile.requests) {
      requestedTeacherCards = Object.keys(profile.requests).map(requestID => {
        // TODO: Figure out how requests are structured
        // let request = profile.school.requests[requestID]
        return null
      })
    }

    // console.log('defaultTeacherCards:')
    // console.log(defaultTeacherCards)

    return {
      defaultCards: defaultTeacherCards,
      requestCards: requestedTeacherCards
    }
  }

  render () {
    let cards = this.getAndFormatTeachers()

    if (cards == null) {
      return (
        <View style={Styles.loadingView}>
          <ActivityIndicator size='large' animating />
        </View>
      )
    }

    return (
      <View style={Styles.mainContainer}>
        <ScrollView>

          <Text style={Styles.header}>Requests</Text>
          {cards.requestCards}
          <Text style={Styles.header}>Regular Homerooms</Text>
          {cards.defaultCards}

        </ScrollView>
      </View>
    )
  }
}
