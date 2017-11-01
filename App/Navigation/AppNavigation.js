import React from 'react'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import SignInScreen from '../Containers/SignInScreen'

import HomeScreen from '../Containers/HomeScreen'
import RequestScreen from '../Containers/RequestScreen'

// Manifest of possible screens
const TabNav = TabNavigator({
  HomeScreen: { screen: HomeScreen },
  RequestScreen: { screen: RequestScreen }
}, {
  initialRouteName: 'HomeScreen',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      activeLabelColor: '#03a9f4',
      tabs: {
        HomeScreen: {
          activeIcon: <Icon size={24} color='#03a9f4' name='home' />,
          icon: <Icon size={24} color='black' name='home' />,
          label: 'Home'
        },
        RequestScreen: {
          activeIcon: <Icon size={24} color='#03a9f4' name='swap-horiz' />,
          icon: <Icon size={24} color='black' name='swap-horiz' />,
          label: 'Request'
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
