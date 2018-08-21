import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../../../Extras/Themes'

export default StyleSheet.create({
  mainContainer: ApplicationStyles.mainContainer,
  searchBar: {
    flex: 4,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: 300
  },
  loadingView: {
    ...ApplicationStyles.mainContainer,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
