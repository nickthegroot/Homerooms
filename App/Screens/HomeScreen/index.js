import React, { Component } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import { firebaseConnect, populate } from 'react-redux-firebase'
import CurrentSeminarCard from '../../Components/CurrentSeminarCard'
import RequestSeminarCard from '../../Components/RequestSeminarCard'
import { connect } from 'react-redux'
import moment from 'moment'
import { MaterialIcons } from '@expo/vector-icons'
import BlueButton from '../../Components/Button'
import { profilePopulates } from '../../../Extras/Config/FirebaseConfig'

import Styles from './Styles'

@firebaseConnect()
@connect(
  ({ firebase }) => {
    return {
      profile: populate(firebase, 'profile', profilePopulates)
    }
  }
)
export default class HomeScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      width: Dimensions.get('window').width
    }
  }

  render () {
    let defaultTeacherCards = null
    let requestedTeacherCards = null

    if (this.props.profile.defaultTeachers) {
      defaultTeacherCards = Object.keys(this.props.profile.defaultTeachers).map(defaultDay => {
        let teacherID = this.props.profile.defaultTeachers[defaultDay]
        let teacherProfile = this.props.profile.school.teachers[teacherID]

        return <CurrentSeminarCard key={teacherProfile.id} day={defaultDay} teacher={teacherProfile} />
      })
    }

    if (this.props.profile.school && this.props.profile.school.requests && this.props.profile.school.requests[this.props.profile.id]) {
      requestedTeacherCards = Object.keys(this.props.profile.school.requests[this.props.profile.id]).map(requestID => {
        let request = this.props.profile.school.requests[this.props.profile.id][requestID]
        if (moment(request.requestedTime).isBefore(moment())) {
          return
        }

        let teacherProfile = this.props.profile.school.teachers[request.teacher]

        return <RequestSeminarCard key={requestID} request={request} teacher={teacherProfile} />
      })
    }

    if (defaultTeacherCards == null) {
      return (
        <View style={Styles.loadingView}>
          <ActivityIndicator size='large' animating />
        </View>
      )
    }

    return (
      <View style={Styles.mainContainer}>
        <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center', width: this.state.width }}>
          <ScrollView>

            <Text style={Styles.header}>Requests</Text>
            {requestedTeacherCards}
            <Text style={Styles.header}>Regular Homerooms</Text>
            {defaultTeacherCards}

          </ScrollView>
        </View>

        {/* Footer */}
        <View style={{ flex: 1, justifyContent: 'center', height: this.state.width, margin: 20 }}>
          <BlueButton onPress={() => this.props.navigation.navigate('SearchScreen')} >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%', paddingTop: 10 }} >
              <MaterialIcons name='add' size={28} color='white' />
              <Text style={Styles.requestText}>Request</Text>
            </View>
          </BlueButton>
        </View>
      </View>
    )
  }
}
