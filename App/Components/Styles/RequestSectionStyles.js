import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  title: {
    fontFamily: 'JosefinSlab-Bold',
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
    flex: 2
  },
  contentSection: {
    flex: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentText: {
    flex: 5
  },
  editContent: {
    flex: 1,
    justifyContent: 'center'
  }
})
