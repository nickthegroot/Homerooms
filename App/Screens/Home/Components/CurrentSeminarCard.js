// @flow

import React from 'react'
import { Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { Fonts, Colors } from '../../../Themes'
import type { Teacher } from '../../../Types/DatabaseTypes'

const CurrentSeminarCard = ({ day, seminarTeacher }: { day: string, seminarTeacher?: Teacher }) => {
  console.tron.log(seminarTeacher)
  let teacherPic = (seminarTeacher && 'picture' in seminarTeacher) ? {uri: seminarTeacher.picture} : null
  if (seminarTeacher) {
    return (<Card
      image={teacherPic}>
      <Text style={{ ...Fonts.style.content, marginBottom: 10 }}>
        Your <Text style={{ ...Fonts.style.content, fontWeight: 'bold' }}>{day}</Text> day Support Seminar is with <Text style={{ ...Fonts.style.content, fontWeight: 'bold' }}>{seminarTeacher.firstName} {seminarTeacher.lastName}</Text> in room <Text style={{ fontWeight: 'bold' }}>{seminarTeacher.room}</Text>
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
