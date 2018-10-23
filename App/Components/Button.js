import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Fonts, Colors } from '../../Extras/Themes'

const Button = ({text, onPress, disabled = false, icon, children}) => {
  return (
    <TouchableOpacity style={(disabled) ? styles.disabledButton : styles.button} onPress={(disabled) ? null : onPress} >
      {
        (children != null)
          ? children
          : (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name={icon} size={26} color='white' style={{ paddingTop: 6 }} />
              <Text style={styles.buttonText}>{text}</Text>
            </View>
          )
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
    paddingRight: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
    paddingRight: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Button
