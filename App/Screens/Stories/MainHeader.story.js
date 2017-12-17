import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Moment from 'moment'
import { Images, Metrics, Colors, Fonts } from '../../Themes'

import { View, Text, Image } from 'react-native'
import TitleText from '../Home/Components/TitleText'

const Styles = {
  titleText: {
    ...Fonts.style.header,
    color: 'black',
    textAlign: 'center'
    // backgroundColor: Colors.transparent
  },
  summaryText: {
    ...Fonts.style.description,
    textAlign: 'center',
    color: 'black'
    // backgroundColor: Colors.transparent
  },
  break: {
    padding: 20
  }
}

let date = Moment().format('dddd, MMMM Do')
let nextSeminar = Moment().day(7 + 2).hour(12).minute(30)

storiesOf('MainHeader')
  .add('Default', () => (
    <TitleText date={date} name='Nick DeGroot' nextSeminar={nextSeminar.fromNow()} />
  ))
  .add('SocialHeader', () => (
    <View>
      <Image source={Images.school} style={{
        width: Metrics.screenWidth,
        height: 150,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.dirt
      }} />
      <View style={{ flex: 1, flexDirection: 'column', position: 'absolute', top: 10, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={Styles.titleText}>Welcome back, Nick</Text>
        <View style={Styles.break} />
        <View>
          <Text style={Styles.summaryText}>Today is {date}</Text>
          <Text style={Styles.summaryText}>The next Support Seminar is {nextSeminar.fromNow()}</Text>
        </View>
      </View>
    </View>
  ))
