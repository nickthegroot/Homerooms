import { StyleSheet } from 'react-native'
import { Fonts } from '../../../Extras/Themes'

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
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerText: {
    ...Fonts.style.content
  },
  reasonView: {
    backgroundColor: 'white',
    flex: 0
  },
  reasonTitle: {
    ...Fonts.style.heading
  },
  reasonInput: {
    fontFamily: Fonts.type.content,
    fontSize: Fonts.size.regular
  },
  reasonButtons: {
    fontFamily: Fonts.type.content,
    fontSize: Fonts.size.regular
  },
  confirmView: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25
  },
  dayView: {
    backgroundColor: 'white',
    flex: 0
  },
  dayTitle: {
    ...Fonts.style.heading
  },
  dayButtons: {
    fontFamily: Fonts.type.content,
    fontSize: Fonts.size.regular
  }
})
