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

      <Divider />

      <View style={Styles.contentSection}>
        <View>
          {/* Content */}
          <Text style={Styles.content}>{content}</Text>
        </View>

        {/* Only Show Edit Button When Needed */}
        {(onEditClick)
          ? (
            <View onClick={onEditClick}>
              <Icon name='chevron-right' size={30} color='black' />
            </View>
            )
          : null
        }

      </View>
    </View>
  )
}

export default RequestSection
