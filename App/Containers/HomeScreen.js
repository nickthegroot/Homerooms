import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Moment from 'moment'
import { getTheme } from 'react-native-material-kit'

import Styles from './Styles/HomeScreenStyles'
const theme = getTheme()

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: Moment().format('dddd, MMMM Do'),
      name: 'Nick',
      nextSeminar: Moment().endOf('day').fromNow(), // TODO Change to actual next seminar
      teacher: {
        name: 'Ms. Dunn',
        room: 201,
        picture: 'https://lh4.googleusercontent.com/-MTGT0NQMvPc/AAAAAAAAAAI/AAAAAAAAACM/r24A-Y5y5ow/photo.jpg?sz=75'
      }
    }
  }

  render () {
    return (
      <ScrollView>
        <View style={Styles.settingsIcons}>
          <Icon size={20} color='black' name='settings' />
        </View>
        <View style={Styles.container}>
          <Text style={Styles.titleText}>Welcome back, {this.state.name}</Text>
          <View style={Styles.break} />
          <View>
            <Text style={Styles.summaryText}>Today is {this.state.date}</Text>
            <Text style={Styles.summaryText}>The next Support Seminar is {this.state.nextSeminar}</Text>
          </View>
          <View style={Styles.break} />

          {/* Card */}

          <View style={theme.cardStyle}>
            <Image source={{ uri: this.state.teacher.picture }} style={theme.cardImageStyle} />
            <Text style={[theme.cardTitleStyle, { backgroundColor: 'white', padding: 5 }]}>{this.state.teacher.name}</Text>
            <View style={{ padding: 15 }}>
              <Text style={[theme.cardContentStyle, Styles.summaryText, { padding: 0 }]}>
                For the next Support Seminar, you are scheduled for {this.state.teacher.name} in room {this.state.teacher.room}.
              </Text>
            </View>
            <View style={theme.cardActionStyle}>
              <Text>E-Mail</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}
