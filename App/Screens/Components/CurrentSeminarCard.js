// @flow

import React from 'react'
import { Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Moment from 'moment'
import { Fonts, Colors } from '../../Themes'
import type { Teacher } from '../../Types/DatabaseTypes'

const CurrentSeminarCard = ({ day, seminarTeacher, onClick, icon = 'email', title = 'E-Mail Teacher', nextDay }: { day: string, seminarTeacher: Teacher, onClick: (email: string) => void, icon: string, title: string, nextDay: Moment }) => {
  let teacherPic = (seminarTeacher && 'picture' in seminarTeacher) ? {uri: seminarTeacher.picture} : null
  if (seminarTeacher) {
    return (
      <Card image={teacherPic}>
        {(nextDay)
          ? (
            <Text style={{ ...Fonts.style.content, marginBottom: 10 }}>
              Your next <Text style={{ ...Fonts.style.content, fontWeight: 'bold' }}>{day}</Text> day Homeroom is with <Text style={{ ...Fonts.style.content, fontWeight: 'bold' }}>{seminarTeacher.firstName} {seminarTeacher.lastName}</Text> in room <Text style={{ fontWeight: 'bold' }}>{seminarTeacher.room}</Text> on <Text style={{ fontWeight: 'bold' }}>{nextDay.format('dddd, MMMM Do')}</Text>
            </Text>
          )
          : <Text style={{ ...Fonts.style.content, marginBottom: 10 }}>
            Your <Text style={{ ...Fonts.style.content, fontWeight: 'bold' }}>{day}</Text> day Homerooms are with <Text style={{ ...Fonts.style.content, fontWeight: 'bold' }}>{seminarTeacher.firstName} {seminarTeacher.lastName}</Text>
          </Text>}

        <Button
          icon={{ name: icon }}
          backgroundColor={Colors.lightBlue}
          fontFamily={Fonts.type.headings}
          buttonStyle={{ borderRadius: 2, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title={title}
          onPress={() => onClick(seminarTeacher.email)} />
      </Card>
    )
  }

  return null
}

export default CurrentSeminarCard
