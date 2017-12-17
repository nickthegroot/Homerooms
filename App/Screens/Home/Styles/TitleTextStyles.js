import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../../Themes/'

export default StyleSheet.create({
  titleText: {
    ...Fonts.style.header,
    color: 'black',
    textAlign: 'center'
  },
  summaryText: {
    ...Fonts.style.description,
    textAlign: 'center',
    color: 'black'
  },
  break: {
    padding: 20
  },
  image: {
    width: Metrics.screenWidth,
    height: 250,
    borderColor: Colors.dirt
  },
  imageView: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
