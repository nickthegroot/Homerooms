import React, { Component } from 'react'
import { View, ScrollView, Linking, ActivityIndicator } from 'react-native'
import { firebaseConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import Moment from 'moment'

import { firebaseProfilePopulates } from '../../Config/FirebaseConfig'
import Styles from './Styles'

@firebaseConnect()
@connect(({ firebase }) => ({
  profile: firebase.profile,
  populatedProfile: populate(firebase, 'profile', firebaseProfilePopulates)
}))
export default class HomeScreen extends Component {
  render () {
        
  }
}
