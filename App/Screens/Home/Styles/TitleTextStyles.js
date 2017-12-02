import { StyleSheet } from 'react-native'
import { Fonts } from '../../../Themes/'

export default StyleSheet.create({
  titleText: {
    ...Fonts.style.header,
    paddingTop: 70,
    color: 'black',
    textAlign: 'center'
  },
  summaryText: {
    ...Fonts.style.description,
    textAlign: 'center'
  },
  break: {
    padding: 30
  }
})
