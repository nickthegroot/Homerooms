// @flow

import React, { Component } from 'react'
import { View, Image, Text, TextInput, Button } from 'react-native'
import { Divider } from 'react-native-elements'
import { Calendar } from 'react-native-calendars'
import Modal from 'react-native-modal'
import moment from 'moment'
import TouchID from 'react-native-touch-id'
import RequestSection from './RequestSection'
import BlueButton from './Button'
import requestTeacher from '../../Services/requestTeacher'
import { getNextSeminar } from '../../Services/getNextSeminar'
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
    if (moment(date.dateString).weekday() === 2 || moment(date.dateString).weekday() === 3) {
      this.setState({
        requestedDate: moment(date.dateString).hour(13).minute(30),
        dayVisiblity: true
      })
    }
  }

  handleRequest = () => {
    // Check to make sure all info is entered correctly.
    if (this.props.requestedTeacher && this.state.requestedDate && (this.state.requestedDay === 'A' || this.state.requestedDay === 'B') && this.props.firebase.auth()._user.uid) {
      // Verify user with touch ID
      TouchID.authenticate('Verify your Identity')
        .then(success => {
          this.props.firebase.updateProfile(requestTeacher(
            this.props.requestedTeacher.id,
            this.state.requestedDate,
            this.props.firebase.auth()._user.uid,
            this.state.requestedDay,
            this.state.reason
            ))
          this.props.onFinish()
        })
        .catch(error => {
          switch (error) {
            case 'RCTTouchIDNotSupported':
            case 'LAErrorTouchIDNotAvailable':
            case 'LAErrorTouchIDNotEnrolled':
              this.props.firebase.updateProfile(requestTeacher(this.props.requestedTeacher.key, this.state.requestedDate, this.props.firebase.auth()._user.uid, this.state.requestedDay))
              this.props.onFinish()
              break
            default:
              break
          }
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
          onBackdropPress={this.props.onFinish} >

          <Modal isVisible={this.state.calVisiblity} onBackdropPress={() => this.setState({ requestedDay: null, requestedDate: null, calVisiblity: false })}>
            <Modal isVisible={this.state.dayVisiblity} onBackdropPress={() => this.setState({ dayVisiblity: false, requestedDay: null, requestedDate: null, calVisiblity: false })}>
              <View style={Styles.dayView}>
                <Text style={Styles.dayTitle}>Is this an A or B day?</Text>
                <Button style={Styles.dayButtons} title='A' onPress={() => { this.setState({ requestedDay: 'A', dayVisiblity: false }); setTimeout(() => this.setState({calVisiblity: false}), 320) }} />
                <Button style={Styles.dayButtons} title='B' onPress={() => { this.setState({ requestedDay: 'B', dayVisiblity: false }); setTimeout(() => this.setState({ calVisiblity: false }), 320) }} />
              </View>
            </Modal>
            <Calendar
              style={{ flex: 0 }}
              markedDates={this.state.markedDates}
              minDate={moment().format('YYYY-MM-DD')}
              onMonthChange={(date) => this.onMonthChange(date)}
              onDayPress={(date) => this.handleDatePress(date)} />
          </Modal>

          <Modal isVisible={this.state.reasonVisiblity} onBackdropPress={() => this.setState({ reasonVisiblity: false, reason: '' })}>
            <View style={Styles.reasonView}>
              <Text style={Styles.reasonTitle}>Reason</Text>
              <TextInput
                style={Styles.reasonInput}
                onChangeText={(text) => this.setState({reason: text})}
                value={this.state.reason}
                placeholder='Need some advice on my research paper' />
              <Button style={Styles.reasonButtons} title='Enter' onPress={() => this.setState({ reasonVisiblity: false })} />
              <Button style={Styles.reasonButtons} title='Cancel' onPress={() => this.setState({ reasonVisiblity: false, reason: '' })} />
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
              content={(this.state.requestedDate && this.state.requestedDay) ? `${this.state.requestedDate.format('dddd, MMMM Do')} | ${this.state.requestedDay} Day` : 'Set a date'}
              onEditClick={() => this.setState({ calVisiblity: true })} />

            <Divider />

            <RequestSection
              title='Reason'
              content={(this.state.reason) ? this.state.reason : 'Set a reason'}
              onEditClick={() => this.setState({ reasonVisiblity: true })} />

            <View style={Styles.confirmView}>
              <BlueButton
                text='Confirm Request'
                disabled={!(this.props.requestedTeacher && this.state.requestedDate && (this.state.requestedDay === 'A' || this.state.requestedDay === 'B') && this.props.firebase.auth()._user.uid)}
                onPress={this.handleRequest} />
            </View>

          </View>

        </Modal>

      </View>
    )
  }
}

export default RequestTeacherPopup
