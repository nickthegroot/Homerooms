import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  boldLabel: {
    fontFamily: Fonts.type.header,
    fontSize: Fonts.size.smallHeader,
    alignSelf: 'center',
    color: 'black',
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  listContent: {
    marginTop: Metrics.doubleBaseMargin,
    marginRight: Metrics.smallMargin,
    marginLeft: Metrics.smallMargin
  },
  sectionHeader: {
    // backgroundColor: '#',
    backgroundColor: Colors.highligher,
    borderRadius: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
  }
})
