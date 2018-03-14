// @flow
import * as React from 'react'
import { ScrollView, Text, View, Platform } from 'react-native'
import { firebaseConnect, populate } from 'react-redux-firebase'
import { Button, Card } from 'react-native-elements'
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
  handleSignOut () {
    this.props.firebase.logout()
  }

  render () {
    return (
      <ScrollView style={Styles.mainContainer} >
        {(!this.props.populatedProfile.isEmpty)
        ? (
          <View>
            <Card>
              <Text style={{ marginBottom: 10 }}>
                You're signed in as {this.props.populatedProfile.name}
              </Text>
              <Button
                backgroundColor={Colors.lightBlue}
                fontFamily={(Platform.OS === 'ios') ? Fonts.type.headings : Fonts.type.headings + '-Regular'}
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='Sign Out'
                onPress={this.handleSignOut.bind(this)} />
            </Card>

            <CurrentSeminarCard day='A' seminarTeacher={this.props.populatedProfile.seminars.a} onClick={() => this.props.navigation.navigate('ChangeScreen', { dayChange: 'A' })} icon='edit' title='Change Default Homeroom' isSettings />
            <CurrentSeminarCard day='B' seminarTeacher={this.props.populatedProfile.seminars.b} onClick={() => this.props.navigation.navigate('ChangeScreen', { dayChange: 'B' })} icon='edit' title='Change Default Homeroom' isSettings />
          </View>
        )
      : null
    }
      </ScrollView>
    )
  }
}

export default SettingsScreen
