import { StyleSheet } from 'react-native'
import { Fonts } from '../../../Themes'

export default StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  header: {
    flex: 1,
    flexDirection: 'row'
  },
  footerText: {
    ...Fonts.style.content
  }
})
