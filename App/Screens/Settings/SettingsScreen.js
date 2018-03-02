// @flow
import * as React from 'react'
import { ScrollView, Text } from 'react-native'
import { firebaseConnect, populate } from 'react-redux-firebase'
import { Button, Card } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Fonts, Colors } from '../../Themes'
import { firebaseProfilePopulates } from '../../Config/FirebaseConfig'
import CurrentSeminarCard from '../Components/CurrentSeminarCard'

import type { NavigationState } from 'react-navigation'
import type { Student } from '../../Types/DatabaseTypes'
import type Firebase from 'react-redux-firebase'

import Styles from './Styles/SettingsScreenStyles'

type Props = {
  firebase: Firebase,
  profile: Student,
  navigation: NavigationState
}

const mapDispatchToProps = dispatch => {
  return {
    setDayForChange: (day: 'A' | 'B') => {
      dispatch({ type: 'NAVIGATION/setDayChange', day: day })
    }
  }
}

@firebaseConnect()
@connect(({ firebase }) => ({
  populatedProfile: populate(firebase, 'profile', firebaseProfilePopulates)
}), mapDispatchToProps)
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

  onHomeroomChange = (day: 'A' | 'B') => {
    this.props.setDayForChange(day)
    this.props.navigation.navigate({ routeName: 'ChangeScreen' })
  }

  render () {
    return (
      <ScrollView style={Styles.mainContainer} >
        <Card>
          <Text style={{ marginBottom: 10 }}>
            You're signed in as {this.props.populatedProfile.name}
          </Text>
          <Button
            backgroundColor={Colors.lightBlue}
            fontFamily={Fonts.type.headings}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='Sign Out'
            onPress={this.handleSignOut.bind(this)} />
        </Card>

        <CurrentSeminarCard day='A' seminarTeacher={(this.props.populatedProfile.isLoaded) ? this.props.populatedProfile.seminars.a : null} onClick={() => this.onHomeroomChange('A')} icon='edit' title='Change Default Homeroom' />
        <CurrentSeminarCard day='B' seminarTeacher={(this.props.populatedProfile.isLoaded) ? this.props.populatedProfile.seminars.b : null} onClick={() => this.onHomeroomChange('B')} icon='edit' title='Change Default Homeroom' />

      </ScrollView>
    )
  }
}

export default SettingsScreen
