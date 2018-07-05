import React from 'react'
import { Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { Fonts, Colors } from '../../Themes'

const CurrentSeminarCard = ({ day, seminarTeacher, onClick, icon = 'email', title = 'E-Mail Teacher' }) => {
  let teacherPic = (seminarTeacher && 'picture' in seminarTeacher && !isSettings) ? {uri: seminarTeacher.picture} : null
  if (seminarTeacher) {
    return (
      <Card image={teacherPic}>
        {(nextDay)
          ? (
            <Text style={{ ...Fonts.style.content, marginBottom: 10 }}>
              Your next <Text style={{ ...Fonts.style.boldContent }}>{day}</Text> day Homeroom is with <Text style={Fonts.style.boldContent}>{seminarTeacher.firstName} {seminarTeacher.lastName}</Text> in room <Text style={{ fontWeight: 'bold' }}>{seminarTeacher.room}</Text> on <Text style={{ fontWeight: 'bold' }}>{nextDay.format('dddd, MMMM Do')}</Text>
            </Text>
          )
          : <Text style={{ ...Fonts.style.content, marginBottom: 10 }}>
            Your <Text style={Fonts.style.boldContent}>{day}</Text> day Homerooms are with <Text style={Fonts.style.boldContent}>{seminarTeacher.firstName} {seminarTeacher.lastName}</Text>
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
