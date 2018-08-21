import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import HeaderButtons from 'react-navigation-header-buttons'
import { MaterialIcons } from '@expo/vector-icons'
import NavigationService from '../Navigation/NavigationService'

import { Colors, ApplicationStyles as Styles } from '../Themes'

import LaunchScreen from '../../App/Screens/LaunchScreen'
import LoginScreen from '../../App/Screens/LoginScreen'
import HomeScreen from '../../App/Screens/HomeScreen'
import SearchScreen from '../../App/Screens/SearchScreen'

const generateHeaderTitle = (title) => {
  return <Text style={Styles.largeTitleWhite}>{title}<Text style={Styles.largeTitleBlue}>.</Text></Text>
}

const headerButtons = (
  <HeaderButtons IconComponent={MaterialIcons} iconSize={23} color='white'>
    <HeaderButtons.Item title='search' iconName='search' onPress={() => NavigationService.navigate('SearchScreen')} />
  </HeaderButtons >
)

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
      headerTitle: generateHeaderTitle('Homerooms'),
      headerRight: headerButtons
    }
  },
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.darkBlue
      },
      headerTintColor: '#fff',
      headerTitle: generateHeaderTitle('Search')
    }
  }
}, {
  initialRouteName: 'LaunchScreen'
})

export default PrimaryNav
