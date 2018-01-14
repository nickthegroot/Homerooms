import React from 'react'
import { View, Image } from 'react-native'
import { SearchBar } from 'react-native-elements'

import Styles from './Styles/HeaderStyles'

const Header = () => {
  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.container}>
        <Image
          source={require('../../Assets/Images/logo.png')}
          style={Styles.logo}
          resizeMode='contain' />
        <SearchBar
          round
          lightTheme
          containerStyle={Styles.searchBar}
          onChangeText={() => {}}
          onClearText={() => {}}
          placeholder='Search' />
      </View>
    </View>
  )
}

export default Header
