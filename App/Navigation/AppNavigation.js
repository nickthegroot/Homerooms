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
      labelColor: 'gray',
      shifting: true,
      activeLabelColor: Colors.blue,
      tabs: {
        HomeScreen: {
          activeIcon: <Icon size={24} color={Colors.blue} name='home' />,
          icon: <Icon size={24} color='gray' name='home' />,
          label: 'Home'
        },
        RequestScreen: {
          activeIcon: <Icon size={24} color={Colors.blue} name='swap-horiz' />,
          icon: <Icon size={24} color='gray' name='swap-horiz' />,
          label: 'Request'
        },
        SettingsScreen: {
          activeIcon: <Icon size={24} color={Colors.blue} name='settings' />,
          icon: <Icon size={24} color='gray' name='settings' />,
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
  initialRouteName: 'SignInScreen',
  headerMode: 'none'
})

export default PrimaryNav
