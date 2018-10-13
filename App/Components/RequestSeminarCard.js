import React from 'react'
import moment from 'moment'
import { Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import Styles from './Styles/SeminarCardStyles'

const RequestSeminarCard = ({ teacher, request, onPress }) => {
  let requestStatus = {
    beginning: '',
    status: '',
    end: ''
  }
  if (request.accepted) {
    requestStatus.beginning = 'has been '
    requestStatus.status = 'accepted'
    requestStatus.end = '! Please go straight there on the designated date.'
  } else if (request.viewed) {
    requestStatus.beginning = 'has been '
    requestStatus.status = 'denied'
    requestStatus.end = '. To make another request, just search!'
  } else {
    requestStatus.beginning = 'has not yet been viewed.'
  }

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
        <Text style={Styles.header}>{`Request for ${moment(request.requestedTime).format('MMM Do')}`}</Text>
        <Text style={Styles.body}>Your request for <Text style={Styles.bodyImportant}>{teacher.name}</Text> {requestStatus.beginning}<Text style={Styles.bodyImportant}>{requestStatus.status}</Text>{requestStatus.end}</Text>
      </View>
    </View>
  )
}

export default RequestSeminarCard
