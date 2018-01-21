import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts } from '../../../Themes/'

export default StyleSheet.create({
  mainContainer: ApplicationStyles.mainContainer,
  form: {
    marginTop: 10
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 375,
    height: 100,
    marginBottom: 20
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.3
  },
  contentView: { flex: 1, justifyContent: 'center', padding: 10 },
  formLabelContainer: {
    backgroundColor: 'transparent'
  },
  formLabelText: {
    color: 'white'
  },
  formInputText: {
    ...Fonts.style.content,
    color: 'white'
  }
})
