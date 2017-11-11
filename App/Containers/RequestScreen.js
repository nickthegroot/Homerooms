import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

// More info here: https://facebook.github.io/react-native/docs/sectionlist.html

// Styles
import styles from './Styles/RequestScreenStyles'

class RequestScreen extends Component {
  constructor (props) {
    super(props)
    // TODO: Get data from firebase instead
    this.state = {
      teachers: [
        { name: 'Mr. Grosse', subject: 'Science', room: '111', picture: 'https://cdn.discordapp.com/attachments/321072442334380032/377577442614837249/c672c6fd7ba520a3c05bed1b43cd13b9c9106eb8_full.jpg' },
        { name: 'Mr. Nelson', subject: 'Science', room: '209', picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/rude/128.jpg' },
        { name: 'Mr. Kay', subject: 'Science', room: '210', picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/nellleo/128.jpg' },
        { name: 'Ms. Rose', subject: 'Math', room: '111', picture: 'https://lorempixel.com/640/480/people' },
        { name: 'Ms. Michael', subject: 'Math', room: '209', picture: 'https://lorempixel.com/640/480/people' }
      ]
    }
  }

  render () {
    return (
      <ScrollView style={styles.mainContainer}>
        <List>
          {
            this.state.teachers.map((l, i) => (
              <ListItem
                roundAvatar
                avatar={{ uri: l.picture }}
                key={i}
                title={l.name}
                subtitle={l.subject + ' Teacher | Room ' + l.room}
              />
            ))
          }
        </List>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestScreen)
