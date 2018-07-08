import React, { Component } from 'react'
import { View, Text, ScrollView, Linking, ActivityIndicator } from 'react-native'
import { firebaseConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import Moment from 'moment'

import { firebaseProfilePopulates } from '../../../Extras/Config/FirebaseConfig'
import Styles from './Styles'

@firebaseConnect()
@connect(({ firebase }) => ({
  profile: firebase.profile,
  populatedProfile: populate(firebase, 'profile', firebaseProfilePopulates)
}))
export default class HomeScreen extends Component {
  render () {
    return (
      <View>
        <Text>Hello World</Text>
      </View>
    )
  }
}
