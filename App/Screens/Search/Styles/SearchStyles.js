import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../../Themes'

export default StyleSheet.create({
  mainContainer: ApplicationStyles.mainContainer,
  searchBar: {
    flex: 4,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: 300
  }
})
