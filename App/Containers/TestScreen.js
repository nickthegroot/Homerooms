import React, { Component } from 'react'
import { Text, View } from 'react-native'

// TODO remove
import styles from './Styles/LaunchScreenStyles'

export default class TestScreem extends Component {
  render () {
    return (
      <View style={styles.centered}>
        <Text>Hello, World</Text>
      </View>
    )
  }
}
