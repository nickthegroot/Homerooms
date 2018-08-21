// @flow
import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation'
import HeaderButtons from 'react-navigation-header-buttons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import store from '../Redux'
import Styles from './HeaderStyles'

import SignInScreen from '../Screens/SignIn/SignInScreen'
import LaunchScreen from '../Screens/Launch/LaunchScreen'
import SearchScreen from '../Screens/Search/SearchScreen'
import ChangeScreen from '../Screens/Change/ChangeScreen'

import HomeScreen from '../Screens/Home/HomeScreen'
import RequestScreen from '../Screens/Request/RequestScreen'
import SettingsScreen from '../Screens/Settings/SettingsScreen'

import { Colors } from '../Themes'

const headerButtons = (
  <HeaderButtons IconComponent={Icon} iconSize={23} color='white'>
    <HeaderButtons.Item title='search' iconName='search' onPress={() => store.dispatch(NavigationActions.navigate({ routeName: 'SearchScreen' }))} />
  </HeaderButtons >
)

const generateHeaderTitle = (title: string) => {
  return <Text style={Styles.supportSeminarTitleWhite}>{title}<Text style={Styles.supportSeminarTitleBlue}>.</Text></Text>
}

const BottomNav = props => (
  <SafeAreaView
    forceInset={{ top: 'never', bottom: 'always', horizontal: 'never' }}
    style={{ backgroundColor: '#fff' }}>
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
      headerStyle: {
        backgroundColor: Colors.darkBlue
      },
      headerTintColor: '#fff',
      headerTitle: generateHeaderTitle('Homeroom'),
      headerRight: headerButtons
      // headerLeft: logoImage
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
  },
  ChangeScreen: {
    screen: ChangeScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.darkBlue
      },
      headerTitle: generateHeaderTitle('Change'),
      headerTintColor: '#fff'
    }
  }
}, {
  initialRouteName: 'LaunchScreen'
})

export default PrimaryNav
