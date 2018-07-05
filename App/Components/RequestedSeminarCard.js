import React from 'react'
import { Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { Fonts, Colors } from '../../Themes'

export default RequestedSeminarCard = ({ date, teacher, accepted }) => {
  let teacherPic = 'picture' in teacher ? teacher.picture : null
  if (teacher) {
    return (
      <Card image={teacherPic}>
        <Text style={{ ...Fonts.style.content, marginBottom: 10 }}>
        Your Homeroom on <Text style={{ ...Fonts.style.boldContent }}>{date}</Text> day Homeroom is with <Text style={Fonts.style.boldContent}>{seminarTeacher.firstName} {seminarTeacher.lastName}</Text> in room <Text style={{ fontWeight: 'bold' }}>{seminarTeacher.room}</Text> on <Text style={{ fontWeight: 'bold' }}>{nextDay.format('dddd, MMMM Do')}</Text>
        </Text>

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
