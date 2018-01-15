import { StyleSheet } from 'react-native'
import { Colors } from '../../../Themes'
import DeviceInfo from 'react-native-device-info'

const model = DeviceInfo.getModel()

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.darkBlue,
    height: 80
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: (model === 'iPhone X') ? 'flex-end' : 'center'
  },
  logo: {
    height: 32,
    width: 28,
    margin: 7
  },
  searchBar: {
    flex: 4,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: 300
  }
})
