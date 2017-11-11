import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.container,
    alignItems: 'center'
  },
  titleText: {
    ...Fonts.style.header,
    paddingTop: 60,
    color: 'black',
    textAlign: 'center'
  },
  settingsIcons: {
    alignItems: 'flex-end',
    paddingTop: Metrics.doubleBaseMargin
  },
  break: {
    padding: 30
  },
  summaryText: {
    ...Fonts.style.description,
    textAlign: 'center'
  },
  cardText: {
    ...Fonts.style.description
  }
})
