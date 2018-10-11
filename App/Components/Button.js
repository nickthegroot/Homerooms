import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { Fonts, Colors } from '../../Extras/Themes'

const Button = ({text, onPress, disabled = false, children}) => {
  return (
    <TouchableOpacity style={(disabled) ? styles.disabledButton : styles.button} onPress={(disabled) ? null : onPress} >
      {
        (children != null)
          ? children
          : <Text style={styles.buttonText}>{text}</Text>
      }
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
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center'
  },
  buttonText: {
    fontFamily: Fonts.type.content,
    paddingTop: 10,
    fontSize: 24,
    color: 'white',
    textAlign: 'center'
  },
  disabledButton: {
    backgroundColor: Colors.disabled,
    borderRadius: 24,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center'
  }
})

export default Button
