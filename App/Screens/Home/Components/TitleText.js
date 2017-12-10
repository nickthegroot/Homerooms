// @flow
import React from 'react'
import { Text, View } from 'react-native'

import Styles from '../Styles/TitleTextStyles'

type Props = {
  name: string,
  date: string,
  nextSeminar: string
}

const TitleText = ({ name, date, nextSeminar }: Props) => {
  return (
    <View>
      <Text style={Styles.titleText}>Welcome back, {name}</Text>
      <View style={Styles.break} />
      <View>
        <Text style={Styles.summaryText}>Today is {date}</Text>
        <Text style={Styles.summaryText}>The next Support Seminar is {nextSeminar}</Text>
      </View>
    </View>)
}

export default TitleText
