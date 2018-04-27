import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../Themes'

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.darkBlue,
    height: 80
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    height: 32,
    width: 28,
    margin: 7
  },
  supportSeminarTitleWhite: {
    ...Fonts.style.header
  },
  supportSeminarTitleBlue: {
    ...Fonts.style.header,
    color: Colors.lightBlue
  }
})
