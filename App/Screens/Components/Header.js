// @flow
import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import Styles from './Styles/HeaderStyles'

const mapDispatchToProps = dispatch => {
  return {
    navigate: (routeName: string, params: {}) => {
      dispatch(
          NavigationActions.navigate({ routeName: routeName, params: params })
        )
    },
    setQuery: (query: string) => {
      dispatch({ type: 'NAVIGATION/setQuery', query: query })
    }
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Header extends Component {
  onClearText = () => {
    if (this.props.nav.routes[this.props.nav.routes.length - 1].routeName === 'SearchScreen') {
      this.props.navigate('TabNav')
    }
  }

  onSearchChange = (query: string) => {
    this.props.setQuery(query)
    if (!this.props.nav.routes[this.props.nav.routes.length - 1].routeName === 'SearchScreen') {
      this.props.navigate('SearchScreen', { searchQuery: '' })
    }
  }

  render () {
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.container}>
          <Image
            source={require('../../Assets/Images/logo.png')}
            style={Styles.logo}
            resizeMode='contain' />
          {(this.props.dayChange)
          ? null
          : (
            <SearchBar
              round
              lightTheme
              clearIcon={{ color: '#86939e', name: 'clear' }}
              containerStyle={Styles.searchBar}
              onChangeText={this.onSearchChange}
              onClearText={this.onClearText}
              placeholder='Search' />
          )}
        </View>
      </View>
    )
  }
}

export default Header
