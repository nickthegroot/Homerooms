import React from 'react'
// import { SafeAreaView, Text } from 'react-native'
import { TabNavigator, createStackNavigator, NavigationActions } from 'react-navigation'
// import { NavigationComponent } from 'react-native-material-bottom-navigation'
// import HeaderButtons from 'react-navigation-header-buttons'
// import Icon from '@expo/vector-icons/MaterialIcons'

// import { Colors } from '../Themes'

import LaunchScreen from '../Screens/LaunchScreen'
import LoginScreen from '../Screens/LoginScreen'

// const headerButtons = (
//   <HeaderButtons IconComponent={Icon} iconSize={23} color='white'>
//     <HeaderButtons.Item title='search' iconName='search' onPress={() => store.dispatch(NavigationActions.navigate({ routeName: 'SearchScreen' }))} />
//   </HeaderButtons >
// )

// const generateHeaderTitle = (title) => {
//   return <Text style={Styles.supportSeminarTitleWhite}>{title}<Text style={Styles.supportSeminarTitleBlue}>.</Text></Text>
// }

// const BottomNav = props => (
//   <SafeAreaView
//     forceInset={{ top: 'never', bottom: 'always', horizontal: 'never' }}
//     style={{ backgroundColor: '#fff' }}>
//     <NavigationComponent {...props} />
//   </SafeAreaView>
// )

// const TabNav = TabNavigator({
//   RequestScreen: { screen: null },
//   HomeScreen: { screen: null },
//   SettingsScreen: { screen: null }
// }, {
//   initialRouteName: 'HomeScreen',
//   swipeEnabled: true,
//   animationEnabled: true,
//   tabBarComponent: BottomNav,
//   tabBarPosition: 'bottom',
//   tabBarOptions: {
//     bottomNavigationOptions: {
//       labelColor: 'gray',
//       shifting: true,
//       activeLabelColor: Colors.darkBlue,
//       tabs: {
//         HomeScreen: {
//           activeIcon: <Icon size={24} color={Colors.darkBlue} name='home' />,
//           icon: <Icon size={24} color='gray' name='home' />,
//           label: 'Home'
//         },
//         RequestScreen: {
//           activeIcon: <Icon size={24} color={Colors.darkBlue} name='swap-horiz' />,
//           icon: <Icon size={24} color='gray' name='swap-horiz' />,
//           label: 'Request'
//         },
//         SettingsScreen: {
//           activeIcon: <Icon size={24} color={Colors.darkBlue} name='settings' />,
//           icon: <Icon size={24} color='gray' name='settings' />,
//           label: 'Settings'
//         }
//       }
//     }
//   }
// })

const PrimaryNav = createStackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: {
      header: null
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  }
  // TabNav: {
  //   screen: null,
  //   navigationOptions: {
  //     headerStyle: {
  //       backgroundColor: Colors.darkBlue
  //     },
  //     headerTintColor: '#fff',
  //     headerTitle: generateHeaderTitle('Homeroom'),
  //     headerRight: headerButtons
  //     // headerLeft: logoImage
  //   }
  // },
  // SearchScreen: {
  //   screen: null,
  //   navigationOptions: {
  //     headerStyle: {
  //       backgroundColor: Colors.darkBlue
  //     },
  //     headerTintColor: '#fff',
  //     headerTitle: generateHeaderTitle('Search')
  //   }
  // },
  // ChangeScreen: {
  //   screen: null,
  //   navigationOptions: {
  //     headerStyle: {
  //       backgroundColor: Colors.darkBlue
  //     },
  //     headerTitle: generateHeaderTitle('Change'),
  //     headerTintColor: '#fff'
  //   }
  // }
}, {
  initialRouteName: 'LaunchScreen'
})

export default PrimaryNav
