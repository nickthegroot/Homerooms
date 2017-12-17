// @flow
import * as React from 'react'
import { View, Text } from 'react-native'

import Styles from './Styles/SettingsScreenStyles'
import { firebaseConnect } from 'react-redux-firebase'
import { Button, Card } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

type Profile = {
  defaultSeminar: string,
  name: string,
  lastRequest: string
}

type Props = {
  firebase: any,
  profile: Profile,
  navigation: any
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
            NavigationActions.navigate({ routeName: 'SignInScreen' })
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
            backgroundColor='#03A9F4'
            fontFamily='Lato'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='Sign Out'
            onPress={this.handleSignOut.bind(this)} />
        </Card>
      </View>
    )
  }
}

export default SettingsScreen
