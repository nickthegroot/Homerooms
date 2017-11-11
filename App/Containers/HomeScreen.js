import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import Moment from 'moment'

import { Fonts } from '../Themes'
import Styles from './Styles/HomeScreenStyles'

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: Moment().format('dddd, MMMM Do'),
      name: 'Nick',
      nextSeminar: Moment().endOf('day').fromNow(), // TODO Change to actual next seminar
      teacher: {
        name: 'Mr. Grosse',
        room: '201',
        picture: 'https://cdn.discordapp.com/attachments/321072442334380032/377577442614837249/c672c6fd7ba520a3c05bed1b43cd13b9c9106eb8_full.jpg'
      }
    }
  }

  render () {
    return (
      <ScrollView style={Styles.mainContainer}>
        <View style={Styles.container}>
          <Text style={Styles.titleText}>Welcome back, {this.state.name}</Text>
          <View style={Styles.break} />
          <View>
            <Text style={Styles.summaryText}>Today is {this.state.date}</Text>
            <Text style={Styles.summaryText}>The next Support Seminar is {this.state.nextSeminar}</Text>
          </View>
          <View style={Styles.break} />

          <Card>
            <CardTitle
              title='Your Next Support Seminar'
              subtitle={this.state.teacher.name + ' | Room ' + this.state.teacher.room}
              avatarSource={{ uri: this.state.teacher.picture }}
            />
            <CardAction
              separator
              inColumn={false}>
              <CardButton
                onPress={() => { }}
                title='E-Mail'
                color='blue'
              />
            </CardAction>
          </Card>

        </View>
      </ScrollView>
    )
  }
}
