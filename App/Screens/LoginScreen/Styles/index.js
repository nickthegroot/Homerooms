import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts } from '../../../../Extras/Themes/'

export default StyleSheet.create({
  mainContainer: ApplicationStyles.mainContainer,
  form: {
    marginTop: 10,
    padding: 10
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
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
