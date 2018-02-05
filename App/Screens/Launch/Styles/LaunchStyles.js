import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../../Themes/'

export default StyleSheet.create({
  mainComponent: {
    ...ApplicationStyles.mainContainer,
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
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lakeOswegoTitle: {
    fontFamily: Fonts.type.headings,
    fontSize: Fonts.size.heading,
    color: 'white',
    letterSpacing: 1.25
  },
  line: {
    width: 275,
    height: 4,
    backgroundColor: Colors.darkBlue
  },
  supportSeminarTitleWhite: {
    ...Fonts.style.largeHeading
  },
  supportSeminarTitleBlue: {
    ...Fonts.style.largeHeading,
    color: Colors.lightBlue
  }
})
