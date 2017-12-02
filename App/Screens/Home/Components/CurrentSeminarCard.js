import React from 'react'
import { Text } from 'react-native'
import { Card, Button } from 'react-native-elements'

const CurrentSeminarCard = ({ seminarTeacher }) => {
  if (seminarTeacher && 'picture' in seminarTeacher) {
    return (<Card
      image={{ uri: seminarTeacher.picture }}>
      <Text style={{ marginBottom: 10 }}>
        Your next Support Seminar is with <Text style={{ fontWeight: 'bold' }}>{seminarTeacher.firstName} {seminarTeacher.lastName}</Text> in room <Text style={{ fontWeight: 'bold' }}>{seminarTeacher.room}</Text>
      </Text>
      <Button
        icon={{ name: 'email' }}
        backgroundColor='#03A9F4'
        fontFamily='Lato'
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='E-Mail Teacher' />
    </Card>)
  } else if (seminarTeacher) {
    return (<Card>
      <Text style={{ marginBottom: 10 }}>
        With {seminarTeacher.firstName} {seminarTeacher.lastName} in room {seminarTeacher.room}
      </Text>
      <Button
        icon={{ name: 'email' }}
        backgroundColor='#03A9F4'
        fontFamily='Lato'
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='E-Mail Teacher' />
    </Card>)
  }

  return null
}

export default CurrentSeminarCard
