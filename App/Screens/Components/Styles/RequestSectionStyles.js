import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  title: {
    fontFamily: 'JosefinSlab-Regular',
    fontSize: 13,
    color: '#8E8E93',
    letterSpacing: 0.08,
    lineHeight: 16
  },
  content: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: 'black',
    letterSpacing: 0.08,
    lineHeight: 16
  },
  titleSection: {
    flex: 1
  },
  contentSection: {
    flex: 5
  },
  section: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
})
