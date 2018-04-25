import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Header from '../Screens/Components/Header'

import SignInScreen from '../Screens/SignIn/SignInScreen'
import LaunchScreen from '../Screens/Launch/LaunchScreen'
import SearchScreen from '../Screens/Search/SearchScreen'
import ChangeScreen from '../Screens/Change/ChangeScreen'

import HomeScreen from '../Screens/Home/HomeScreen'
import RequestScreen from '../Screens/Request/RequestScreen'
import SettingsScreen from '../Screens/Settings/SettingsScreen'

import { Colors } from '../Themes'

const BottomNav = props => (
  <SafeAreaView
    forceInset={{ top: 'never', bottom: 'always', horizontal: 'never' }}
    style={{ backgroundColor: '#fff' }}
  >
    <NavigationComponent {...props} />
  </SafeAreaView>
)

const TabNav = TabNavigator({
  RequestScreen: { screen: RequestScreen },
  HomeScreen: { screen: HomeScreen },
  SettingsScreen: { screen: SettingsScreen }
}, {
  initialRouteName: 'HomeScreen',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarComponent: BottomNav,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'gray',
      shifting: true,
      activeLabelColor: Colors.darkBlue,
      tabs: {
        HomeScreen: {
          activeIcon: <Icon size={24} color={Colors.darkBlue} name='home' />,
          icon: <Icon size={24} color='gray' name='home' />,
          label: 'Home'
        },
        RequestScreen: {
          activeIcon: <Icon size={24} color={Colors.darkBlue} name='swap-horiz' />,
          icon: <Icon size={24} color='gray' name='swap-horiz' />,
          label: 'Request'
        },
        SettingsScreen: {
          activeIcon: <Icon size={24} color={Colors.darkBlue} name='settings' />,
          icon: <Icon size={24} color='gray' name='settings' />,
          label: 'Settings'
        }
      }
    }
  }
})

const PrimaryNav = StackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: {
      header: null
    }
  },
  SignInScreen: {
    screen: SignInScreen,
    navigationOptions: {
      header: null
    }
  },
  TabNav: {
    screen: TabNav,
    navigationOptions: {
      header: (<Header />)
    }
  },
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      header: (<Header />)
    }
  },
  ChangeScreen: {
    screen: ChangeScreen,
    navigationOptions: {
      header: (<Header />)
    }
  }
}, {
  initialRouteName: 'LaunchScreen'
})

export default PrimaryNav
