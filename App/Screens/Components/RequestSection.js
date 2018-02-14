import React from 'react'
import { View, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Styles from './Styles/RequestSectionStyles'

const RequestSection = ({ title, content, onEditClick }) => {
  return (
    <View style={Styles.section}>

      <View style={Styles.titleSection}>
        {/* Title */}
        <Text style={Styles.title}>{title.toUpperCase()}</Text>
      </View>

      <View style={Styles.contentSection}>
        <View style={Styles.contentText}>
          {/* Content */}
          <Text style={Styles.content}>{content}</Text>
        </View>
      </View>

      <View onClick={onEditClick} style={Styles.editContent}>
        {(onEditClick) // only show edit button when needed
          ? (
            <Icon name='chevron-right' size={30} color='black' />
          )
          : null
        }
      </View>

    </View>
  )
}

export default RequestSection
