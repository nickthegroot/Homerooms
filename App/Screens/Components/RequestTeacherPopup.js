// @flow

import React, { Component } from 'react'
import { View, Image, Text, TextInput, Button } from 'react-native'
import { Divider } from 'react-native-elements'
import { Calendar } from 'react-native-calendars'
import Modal from 'react-native-modal'
import moment from 'moment'
import RequestSection from './RequestSection'
import TouchID from 'react-native-touch-id'
import requestTeacher from '../../Services/requestTeacher'
import getNextSeminar from '../../Services/getNextSeminar'
import type { Teacher } from '../../Types/DatabaseTypes'

import Styles from './Styles/RequestPopupStyles'
import { firebaseConnect } from 'react-redux-firebase'

@firebaseConnect()
class RequestTeacherPopup extends Component<{isVisible: boolean, requestedTeacher: Teacher, onFinish: () => void}> {
  // TODO: Set A/B day

  constructor (props) {
    super(props)

    this.state = {
      markedDates: this.getDaysInMonth(moment().month(), moment().year()),
      requestedDate: null,
      requestedDay: null,
      isVisible: true
    }
  }

  getDaysInMonth (month, year) {
    const DISABLED_DAYS = ['Monday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let pivot = moment().month(month).year(year).startOf('month')
    const end = moment().month(month).year(year).endOf('month')

    let dates = {}
    const disabled = { disabled: true }
    while (pivot.isBefore(end)) {
      DISABLED_DAYS.forEach((day) => {
        dates[pivot.day(day).format('YYYY-MM-DD')] = disabled
      })
      pivot.add(7, 'days')
    }

    return dates
  }

  onMonthChange = (date) => {
    this.setState({
      markedDates: this.getDaysInMonth(date.month - 1, date.year)
    })
  }

  handleDatePress = (date) => {
    console.tron.log(moment(date.dateString).weekday())
    if (moment(date.dateString).weekday() === 2 || moment(date.dateString).weekday() === 3) {
      this.setState({
        requestedDate: moment(date.dateString).hour(13).minute(30),
        calVisiblity: false
      })
    }
  }

  handleRequest = () => {
    // Check to make sure all info is entered correctly.
    if (this.props.requestedTeacher && this.state.requestedDate && (this.state.requestedDay === 'A' || this.state.requestedDay === 'B') && this.props.firebase.auth()._user.uid) {
      // Verify user with touch ID
      TouchID.isSupported()
        .then(biometryType => {
          // TouchID Supported, Request ID
          TouchID.authenticate('Verify Your Identity')
            .then(success => {
              this.props.firebase.updateProfile(requestTeacher(this.props.requestedTeacher.key, this.state.requestedDate, this.props.firebase.auth()._user.uid, this.state.requestedDay))
              this.props.onFinish()
            })
            .catch(() => {
              // TODO: Alert User
            })
        })
        .catch(() => {
          this.props.firebase.updateProfile(requestTeacher(this.props.requestedTeacher.key, this.state.requestedDate, this.props.firebase.auth()._user.uid, this.state.requestedDay))
          this.props.onFinish()
        })
    } else {
      // TODO: alert user not everything is in
      this.props.onFinish()
    }
  }

  render () {
    return (
      <View>

        <Modal
          style={Styles.bottomModal}
          isVisible={this.props.isVisible}
          onSwipe={this.handleRequest}
          swipeDirection='up'
          onBackdropPress={this.props.onFinish} >

          <Modal isVisible={this.state.calVisiblity} onBackdropPress={() => this.setState({ calVisiblity: false })}>
            <Calendar
              style={{ flex: 0 }}
              markedDates={this.state.markedDates}
              minDate={getNextSeminar().format('YYYY-MM-DD')}
              onMonthChange={(date) => this.onMonthChange(date)}
              onDayPress={(date) => this.handleDatePress(date)} />
          </Modal>

          <Modal isVisible={this.state.reasonVisiblity} onBackdropPress={() => this.setState({ reasonVisiblity: false, reason: '' })}>
            <View style={{ backgroundColor: 'white' }}>
              <Text style={Styles.reasonTitle}>Reason</Text>
              <TextInput
                style={Styles.reasonInput}
                onChangeText={(text) => this.setState({reason: text})}
                value={this.state.reason} />
              <Button title='Enter' onPress={() => this.setState({reasonVisiblity: false})} />
              <Button title='Cancel' onPress={() => this.setState({ reasonVisiblity: false, reason: '' })} />
            </View>
          </Modal>

          <View style={{ backgroundColor: 'white', height: 350 }}>

            <View style={Styles.header}>
              <Image source={require('../../Assets/Images/logo.png')} style={{ width: 40, height: 40 }} />
              <Text style={Styles.subsectionTitle}>   REQUEST A TEACHER</Text>
            </View>

            <Divider />

            <RequestSection
              title='Requested Teacher'
              content={(this.props.requestedTeacher) ? `${this.props.requestedTeacher.firstName} ${this.props.requestedTeacher.lastName}` : 'No Teacher Selected'} />

            <Divider />

            <RequestSection
              title='Requested Date'
              content={(this.state.requestedDate) ? this.state.requestedDate.format('dddd, MMMM Do') : 'Set a date'}
              onEditClick={() => this.setState({ calVisiblity: true })} />

            <Divider />

            <RequestSection
              title='Reason'
              content={(this.state.reason) ? this.state.reason : 'Set a reason'}
              onEditClick={() => this.setState({ reasonVisiblity: true })} />

            <Divider />

            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
              <Text style={Styles.footerText}>Slide up to request</Text>
            </View>

          </View>

        </Modal>

      </View>
    )
  }
}

export default RequestTeacherPopup
