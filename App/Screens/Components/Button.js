import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'
import { Fonts, Colors } from '../../Themes'

const Button = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 24,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50
  },
  buttonText: {
    fontFamily: Fonts.type.content,
    paddingTop: 10,
    fontSize: 24,
    color: 'white',
    textAlign: 'center'
  }
})

export default Button
