import React from 'react'
import { Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import Styles from './Styles/CurrentSeminarsStyles'

const CurrentSeminarCard = ({ day, teacher, onPress }) => {
  console.log(teacher)
  return (
    <View style={Styles.cardView} onPress={onPress}>
      {('picture' in teacher)
        ? <Avatar
          size='large'
          rounded
          source={{ uri: teacher.picture }}
        />
        : <Avatar
          size='large'
          rounded
          title={teacher.name.split(' ').map((n) => n[0]).join('')}
        />
      }

      <View style={Styles.textView}>
        <Text style={Styles.header}>{`"${day}" Days`}</Text>
        <Text style={Styles.body}>You’re currently scheduled with <Text style={Styles.bodyImportant}>{teacher.name}</Text> on all <Text style={Styles.bodyImportant}>{day} Days</Text>. To make request another teacher, search for one!</Text>
      </View>
    </View>
  )
}

export default CurrentSeminarCard
