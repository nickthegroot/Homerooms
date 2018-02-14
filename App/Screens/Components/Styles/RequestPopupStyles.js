import { StyleSheet } from 'react-native'
import { Fonts } from '../../../Themes'

export default StyleSheet.create({
  subsectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
    color: '#8E8E93',
    letterSpacing: 0.08,
    lineHeight: 16
  },
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
