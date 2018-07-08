import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import { Colors, ApplicationStyles as Styles } from '../Themes'

import LaunchScreen from '../../App/Screens/LaunchScreen'
import LoginScreen from '../../App/Screens/LoginScreen'
import HomeScreen from '../../App/Screens/HomeScreen'

const generateHeaderTitle = (title) => {
  return <Text style={Styles.largeTitleWhite}>{title}<Text style={Styles.largeTitleBlue}>.</Text></Text>
}

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
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.darkBlue
      },
      headerTintColor: '#fff',
      headerTitle: generateHeaderTitle('Homerooms')
    }
  }
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
