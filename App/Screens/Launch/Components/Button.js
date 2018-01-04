import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

const Button = ({text: buttonText}) => {
  return (
    <View style={styles.button}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3B5998',
    borderRadius: 24,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
    paddingTop: 10,
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center'
  }
})

export default Button
