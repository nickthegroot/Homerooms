import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts } from '../../../../Extras/Themes/'

export default StyleSheet.create({
  mainContainer: {
    ...ApplicationStyles.mainContainer,
    alignItems: 'center'
  },
  header: {
    ...Fonts.style.heading,
    textAlign: 'center',
    fontSize: 24
  },
  loadingView: {
    ...ApplicationStyles.mainContainer,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 8 // pushes the footer to the end of the screen
  },
  footer: {
    flex: 1,
    width: '80%'
  },
  requestText: {
    fontFamily: Fonts.type.content,
    fontSize: 24,
    color: 'white',
    textAlign: 'center'
  }
})
