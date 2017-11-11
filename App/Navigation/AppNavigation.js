import React from 'react'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import SignInScreen from '../Containers/SignInScreen'

import HomeScreen from '../Containers/HomeScreen'
import RequestScreen from '../Containers/RequestScreen'
import SettingsScreen from '../Containers/SettingsScreen'

import { Colors } from '../Themes'

// Manifest of possible screens
const TabNav = TabNavigator({
  RequestScreen: { screen: RequestScreen },
  HomeScreen: { screen: HomeScreen },
  SettingsScreen: { screen: SettingsScreen }
}, {
  initialRouteName: 'HomeScreen',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      shifting: true,
      tabs: {
        HomeScreen: {
          icon: <Icon size={24} color='white' name='home' />,
          barBackgroundColor: Colors.facebook,
          label: 'Home'
        },
        RequestScreen: {
          icon: <Icon size={24} color='white' name='swap-horiz' />,
          barBackgroundColor: Colors.plant,
          label: 'Request'
        },
        SettingsScreen: {
          icon: <Icon size={24} color='white' name='settings' />,
          barBackgroundColor: Colors.dirt,
          label: 'Settings'
        }
      }
    }
  }
})

const PrimaryNav = StackNavigator({
  SignInScreen: { screen: SignInScreen },
  TabNav: { screen: TabNav }
}, {
  initialRouteName: 'TabNav',
  headerMode: 'none'
})

export default PrimaryNav
