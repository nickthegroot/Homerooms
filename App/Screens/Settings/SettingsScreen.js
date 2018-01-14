// @flow
import * as React from 'react'
import { View, Text } from 'react-native'
import { firebaseConnect } from 'react-redux-firebase'
import { Button, Card } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Fonts, Colors } from '../../Themes'

import type { NavigationState } from 'react-navigation'
import type { Student } from '../../Types/DatabaseTypes'
import type Firebase from 'react-redux-firebase'

import Styles from './Styles/SettingsScreenStyles'

type Props = {
  firebase: Firebase,
  profile: Student,
  navigation: NavigationState
}

@firebaseConnect()
@connect(({ firebase }) => ({
  profile: firebase.profile
}))
class SettingsScreen extends React.Component<Props> {
  constructor (props: Props) {
    super(props)
    props.firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'LaunchScreen' })
          ]
        }))
      }
    })
  }

  handleSignOut () {
    this.props.firebase.logout()
  }

  render () {
    return (
      <View style={Styles.mainContainer} >
        <Card>
          <Text style={{ marginBottom: 10 }}>
            You're signed in as {this.props.profile.name}
          </Text>
          <Button
            backgroundColor={Colors.lightBlue}
            fontFamily={Fonts.type.headings}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='Sign Out'
            onPress={this.handleSignOut.bind(this)} />
        </Card>
      </View>
    )
  }
}

export default SettingsScreen
