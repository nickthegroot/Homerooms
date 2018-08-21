import { StyleSheet, Dimensions } from 'react-native'
import { Fonts } from '../../../Extras/Themes'

export default StyleSheet.create({
  cardView: {
    flex: 1,
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  avatarView: {
    flex: 1
  },
  textView: {
    flex: 4,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontFamily: Fonts.families.content + '-Regular',
    fontSize: 18
  },
  body: {
    fontFamily: Fonts.families.content + '-Light',
    fontSize: 10
  },
  bodyImportant: {
    fontFamily: Fonts.families.content + '-Bold',
    fontSize: 10
  }
})
