// @flow
import React from 'react'
import { Text, View, Image } from 'react-native'
import { Images } from '../../../Themes'

import Styles from '../Styles/TitleTextStyles'

type Props = {
  name: string,
  date: string,
  nextSeminar: string
}

const TitleText = ({ name, date, nextSeminar }: Props) => {
  return (
    <View>
      <Image source={Images.school} style={Styles.image} />
      <View style={Styles.imageView}>
        <Text style={Styles.titleText}>Welcome back, {name}</Text>
        <View style={Styles.break} />
        <View>
          <Text style={Styles.summaryText}>Today is {date}</Text>
          <Text style={Styles.summaryText}>The next Support Seminar is {nextSeminar}</Text>
        </View>
      </View>
    </View>
  )
}

export default TitleText
