import React from 'react'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import LaunchScreen from '../Containers/LaunchScreen'
import TestScreen from '../Containers/TestScreen'

// Manifest of possible screens
const PrimaryNav = TabNavigator({
  LaunchScreen: { screen: LaunchScreen },
  TestScreen: { screen: TestScreen }
}, {
  initialRouteName: 'LaunchScreen',
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      activeLabelColor: '#03a9f4',
      tabs: {
        LaunchScreen: {
          activeIcon: <Icon size={24} color='#03a9f4' name='home' />,
          icon: <Icon size={24} color='black' name='home' />,
          label: 'Home'
        },
        TestScreen: {
          activeIcon: <Icon size={24} color='#03a9f4' name='mood' />,
          icon: <Icon size={24} color='black' name='mood' />,
          label: 'Test'
        }
      }
    }
  }
})

export default PrimaryNav
