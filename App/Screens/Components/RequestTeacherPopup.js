// @flow

import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import { Calendar } from 'react-native-calendars'
import Modal from 'react-native-modal'
import { DateTime } from 'luxon'
import RequestSection from './RequestSection'
import TouchID from 'react-native-touch-id'
import requestTeacher from '../../Services/requestTeacher'
import type { Teacher } from '../../Types/DatabaseTypes'

import Styles from './Styles/RequestPopupStyles'
import { firebaseConnect } from 'react-redux-firebase';

const DISABLED_DAYS = [1, 4, 5, 6 ,7] // Thursday - Monday

@firebaseConnect()
class RequestTeacherPopup extends Component<{isVisible: boolean, requestedTeacher: Teacher, onFinish: () => void}> {

  // TODO: Set A/B day

  state = {
    markedDates: this.getDaysInMonth(DateTime.local().month, DateTime.local().year, DISABLED_DAYS),
    calVisiblity: false,
    requestedDate: null,
    requestedDay: null
  }

  onMonthChange = (date) => {
    this.setState({
      markedDates: this.getDaysInMonth(date.month - 1, date.year, DISABLED_DAYS)
    })
  }

  getDaysInMonth(month, year, days) {
    let pivot = DateTime.local(year, month).startOf('month')
    const end = DateTime.local(year, month).endOf('month')

    let dates = {}
    const disabled = { disabled: true }

    while (pivot < end) {
      days.forEach((day) => {
        dates[pivot.set({weekday: day}).toISODate()] = disabled
      })
      pivot.plus({days: 7})
    }

    return dates
  }

  handleRequest = () => {
    // Check to make sure all info is entered correctly.
    if (requestedTeacher && this.state.requestedDate && (this.state.requestedDay == 'A' || this.state.requestedDay == 'B') && this.props.firebase.auth()._user.uid) {
      // Verify user with touch ID
      TouchID.isSupported()
        .then(biometryType => {

          // TouchID Supported, Request ID
          TouchID.authenticate('Verify Your Identity')
            .then(success => {
              this.props.firebase.updateProfile(requestTeacher(teacherItem.key, this.state.requestedDate, this.props.firebase.auth()._user.uid, this.state.requestedDay))
              this.props.onFinish()
            })
            .catch(error => {
              // TODO: Alert user.
            })

        })
        .catch(error => {
          this.props.firebase.updateProfile(requestTeacher(teacherItem.key, this.state.requestedDate, this.props.firebase.auth()._user.uid, this.state.requestedDay))
          this.props.onFinish()
        })
    }
  }

  handleDatePress = (date) => {
    this.setState({
      requestedDate: DateTime.fromISO(date.dateString).set({ hour: 13, minute: 30 }),
      calVisiblity: false
    })
  }

  render () {
    return (
      <Modal
        style={Styles.bottomModal}
        isVisible={this.props.isVisible}
        onSwipe={this.handleRequest}
        swipeDirection='up' >

        <View style={Styles.header}>
          {/* Top View + Header */}
          <Image source={require('../../Assets/Images/logo.png')} />
          <Text style={Styles.subsectionTitle}>REQUEST A TEACHER</Text>
        </View>

        <Overlay isVisible={this.state.calVisiblity}>
          <Calendar
            markedDates={this.state.markedDates}
            markingType={'interactive'}
            onMonthChange={(date) => this.onMonthChange(date) }
            onDayPress={(date) => this.handleDatePress(date) }
          />
        </Overlay>

        <RequestSection
          title='Requested Teacher'
          content={`${this.props.requestedTeacher.firstName} ${this.props.requestedTeacher.lastName}`} />

        <Divider />

        <RequestSection
          title='Requested Teacher'
          content={(this.state.requestedDate) ? this.state.requestedDate.toLocaleString(DateTime.DATE_HUGE) : 'Set a date'}
          onEditClick={() => this.setState({calVisiblity: true})} />

        <Divider />

        <View>
          <Text style={Styles.footerText}>Slide up to request</Text>
        </View>

      </Modal>
    )
  }
}

export default RequestTeacherPopup
