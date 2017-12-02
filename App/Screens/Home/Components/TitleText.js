import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import Styles from '../Styles/TitleTextStyles'

const TitleText = ({ name, date, nextSeminar }) => {
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

TitleText.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  nextSeminar: PropTypes.string
}

export default TitleText
