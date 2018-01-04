import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../../Themes/'

export default StyleSheet.create({
  mainComponent: {
    ...ApplicationStyles.screen.mainContainer,
    backgroundColor: 'transparent'
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
  contentView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  lakeOswegoTitle: { fontFamily: 'OpenSans-Regular', fontSize: 20, color: '#FFFFFF', letterSpacing: 1.25 },
  line: { width: 275, height: 4, backgroundColor: '#3B5998' },
  supportSeminarTitleWhite: { fontFamily: 'Lato-Bold', fontSize: 52, color: '#FFFFFF' },
  supportSeminarTitleBlue: { fontFamily: 'Lato-Bold', fontSize: 52, color: '#1E88E5' }
})
