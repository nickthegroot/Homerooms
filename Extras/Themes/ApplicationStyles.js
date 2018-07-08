import Colors from './Colors'
import Fonts from './Fonts'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  largeTitleWhite: {
    ...Fonts.style.largeHeading,
    flex: 1,
    fontSize: 25,
    textAlign: 'center',
    alignItems: 'center'
  },
  largeTitleBlue: {
    ...Fonts.style.largeHeading,
    color: Colors.lightBlue,
    fontSize: 25
  }
}

export default ApplicationStyles
