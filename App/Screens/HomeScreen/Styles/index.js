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
  }
})
