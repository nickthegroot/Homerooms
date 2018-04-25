// @flow
import React, { Component } from 'react'
import { Image, View, SafeAreaView } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import Styles from './Styles/HeaderStyles'

const mapDispatchToProps = dispatch => {
  return {
    navigate: (routeName: string, params: {}) => {
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: routeName, params: params })
        ]
      }))
    },

    setQuery: (query: string) => {
      dispatch({ type: 'NAVIGATION/setQuery', query: query })
    }
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav,
    dayChange: state.dayChange
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Header extends Component {
  onFocusSearch = () => {
    this.search.focus()
  }

  onClearText = () => {
    if (this.props.nav.routes[this.props.nav.routes.length - 1].routeName === 'SearchScreen') {
      this.props.navigate('TabNav')
    }
  }

  onSearchChange = (query: string) => {
    this.props.setQuery(query)
    if (!(this.props.nav.routes[this.props.nav.routes.length - 1].routeName === 'SearchScreen')) {
      this.props.navigate('SearchScreen', { focusSearch: this.onFocusSearch })
    }
  }

  render () {
    return (
      <SafeAreaView style={Styles.mainContainer} forceInset={{ top: 'always', bottom: 'never', horizontal: 'never' }}>
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
              ref={search => (this.search = search)}
              placeholder='Search' />
          )}
        </View>
      </SafeAreaView>
    )
  }
}

export default Header
