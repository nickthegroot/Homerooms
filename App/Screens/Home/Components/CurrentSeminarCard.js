import React from 'react'
import { Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { Fonts, Colors } from '../../../Themes'

const CurrentSeminarCard = ({ seminarTeacher }) => {
  if (seminarTeacher && 'picture' in seminarTeacher) {
    return (<Card
      image={{ uri: seminarTeacher.picture }}>
      <Text style={{ ...Fonts.style.content, marginBottom: 10 }}>
        Your next Support Seminar is with <Text style={{ ...Fonts.style.content, fontWeight: 'bold' }}>{seminarTeacher.firstName} {seminarTeacher.lastName}</Text> in room <Text style={{ fontWeight: 'bold' }}>{seminarTeacher.room}</Text>
      </Text>
      <Button
        icon={{ name: 'email' }}
        backgroundColor={Colors.lightBlue}
        fontFamily={Fonts.type.headings}
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='E-Mail Teacher' />
    </Card>)
  } else if (seminarTeacher) {
    return (<Card>
      <Text style={{ ...Fonts.style.content, marginBottom: 10 }}>
        Your next Support Seminar is with <Text style={{ ...Fonts.style.content, fontWeight: 'bold' }}>{seminarTeacher.firstName} {seminarTeacher.lastName}</Text> in room <Text style={{ fontWeight: 'bold' }}>{seminarTeacher.room}</Text>
      </Text>
      <Button
        icon={{ name: 'email' }}
        backgroundColor={Colors.lightBlue}
        fontFamily={Fonts.type.headings}
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='E-Mail Teacher' />
    </Card>)
  }

  return null
}

export default CurrentSeminarCard
