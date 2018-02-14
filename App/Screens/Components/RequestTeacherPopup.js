// @flow

import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { Divider, Overlay } from 'react-native-elements'
import { Calendar } from 'react-native-calendars'
import Modal from 'react-native-modal'
import { DateTime } from 'luxon'
import RequestSection from './RequestSection'
import TouchID from 'react-native-touch-id'
import requestTeacher from '../../Services/requestTeacher'
import type { Teacher } from '../../Types/DatabaseTypes'

import Styles from './Styles/RequestPopupStyles'
import { firebaseConnect } from 'react-redux-firebase'

// const DISABLED_DAYS = [1, 4, 5, 6, 7] // Thursday - Monday
// function getDaysInMonth (month, year, days) {
//   let pivot = DateTime.local(year, month).startOf('month')
//   const end = DateTime.local(year, month).endOf('month')

//   let dates = {}
//   const disabled = { disabled: true }

//   while (pivot < end) { // eslint-disable-line
//     days.forEach((day) => {
//       dates[pivot.set({ weekday: day }).toISODate()] = disabled
//     })
//     pivot.plus({ days: 7 })
//   }

//   return dates
// }

@firebaseConnect()
class RequestTeacherPopup extends Component<{isVisible: boolean, requestedTeacher: Teacher, onFinish: () => void}> {
  // TODO: Set A/B day

  constructor (props) {
    super(props)
    this.state = {
      // markedDates: getDaysInMonth(DateTime.local().month, DateTime.local().year, DISABLED_DAYS),
      calVisiblity: false,
      requestedDate: null,
      requestedDay: null
    }
  } 

  // onMonthChange = (date) => {
  //   this.setState({
  //     markedDates: getDaysInMonth(date.month - 1, date.year, DISABLED_DAYS)
  //   })
  // }

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
            .catch(error => {
              // TODO: Alert User
            })
        })
        .catch(error => {
          this.props.firebase.updateProfile(requestTeacher(this.props.requestedTeacher.key, this.state.requestedDate, this.props.firebase.auth()._user.uid, this.state.requestedDay))
          this.props.onFinish()
        })
    }
  }

  // handleDatePress = (date) => {
  //   this.setState({
  //     requestedDate: DateTime.fromISO(date.dateString).set({ hour: 13, minute: 30 }),
  //     calVisiblity: false
  //   })
  // }

  render () {
    return (
      <Modal
        style={Styles.bottomModal}
        isVisible={this.props.isVisible}
        onSwipe={this.props.onFinish}
        swipeDirection='up' >

        {/* <Overlay isVisible={this.state.calVisiblity}>
          <Calendar
            markedDates={this.state.markedDates}
            markingType={'interactive'}
            onMonthChange={(date) => this.onMonthChange(date)}
            onDayPress={(date) => this.handleDatePress(date)}
          />
        </Overlay> */}

        <View style={{ backgroundColor: 'white', height: 300 }}>

          <View style={Styles.header}>
            <Image source={require('../../Assets/Images/logo.png')} style={{ width: 30, height: 30 }} />
            <Text style={Styles.subsectionTitle}>REQUEST A TEACHER</Text>
          </View>

          <Divider />

          <RequestSection
            title='Requested Teacher'
            content={(this.props.requestedTeacher) ? `${this.props.requestedTeacher.firstName} ${this.props.requestedTeacher.lastName}` : 'No Teacher Selected'} />

          <Divider />

          <RequestSection
            title='Requested Date'
            content={(this.state.requestedDate) ? this.state.requestedDate.toLocaleString(DateTime.DATE_HUGE) : 'Set a date'}
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
    )
  }
}

export default RequestTeacherPopup
