import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Metrics from '../../Themes/Metrics'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.container,
    alignItems: 'center'
  },
  titleText: {
    ...Fonts.style.h4,
    fontWeight: 'bold',
    // paddingVertical: 40,
    paddingTop: 25,
    color: 'black',
    textAlign: 'center'
  },
  settingsIcons: {
    alignItems: 'flex-end',
    paddingTop: Metrics.doubleBaseMargin
  },
  break: {
    padding: 40
  },
  summaryText: {
    ...Fonts.style.description,
    textAlign: 'center'
  }
})
