import moment from 'moment'
import React, { Component } from 'react'
import { ActivityIndicator, Alert, Button, Image, Text, TextInput, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Divider } from 'react-native-elements'
import Modal from 'react-native-modal'
import requestTeacher from '../../Extras/Services/requestTeacher'
import BlueButton from './Button'
import RequestSection from './RequestSection'
import Styles from './Styles/RequestPopupStyles'

class RequestTeacherPopup extends Component {
  constructor (props) {
    super(props)

    // Calendar calculations for max/min date
    let calMinDate = moment() // AKA Today
    let calMaxDate = moment('2018-08-27T04:00:00.000Z').add(14, 'days') // Reasonable limit
    let disabledDays = ['Saturday', 'Sunday']

    if ('disabledDays' in props.profile.school.homeroomTimes) {
      disabledDays = props.profile.school.homeroomTimes.disabledDays
    }

    const schoolStartDate = moment(props.profile.school.startDate)

    // Is today (calMinDate) BEFORE the school start date?  If so, we need to set the min to the school start date instead.
    if (schoolStartDate.isAfter(calMinDate)) {
      calMinDate = schoolStartDate
    }

    const schoolEndDate = moment(props.profile.school.endDate)

    // Is today (calMinDate) AFTER the school end date?  If so, we need to set the max to the school end date instead.
    if (schoolEndDate.isBefore(calMaxDate)) {
      calMaxDate = schoolEndDate
    }

    this.state = {
      disabledDays: disabledDays,
      calMax: calMaxDate.format('YYYY-MM-DD'),
      calMin: calMinDate.format('YYYY-MM-DD'),
      markedDates: this.getDaysInMonth(moment().month(), moment().year(), disabledDays),
      requestedDate: null,
      requestedDay: null,
      requesting: false
    }
  }

  getDaysInMonth (month, year, disabledDays) {
    const DISABLED_DAYS = disabledDays
    let pivot = moment().month(month).year(year).startOf('month')
    const end = moment().month(month).year(year).endOf('month')

    let dates = {}
    const disabled = { disabled: true }

    dates[moment().format('YYYY-MM-DD')] = { marked: true }
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
      markedDates: this.getDaysInMonth(date.month - 1, date.year, this.state.disabledDays)
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

  sendRequest = () => {
    requestTeacher(
      this.props.profile.school.id,
      this.props.requestedTeacher.id,
      this.state.requestedDate.toDate(),
      this.state.reason
    )
  }

  handleRequest = () => {
    // Check to make sure all info is entered correctly.
    if (this.props.requestedTeacher && this.state.requestedDate && (this.state.requestedDay === 'A' || this.state.requestedDay === 'B')) {
      this.setState({ requesting: true })

      try {
        this.sendRequest()
      } catch (e) {
        console.error(e)
        this.props.onFinish(false)
        return
      }

      this.props.onFinish(true)
    }
  }

  render () {
    // TODO: Instead of A/B day, ask which teacher they'd be replacing
    if (!this.props.profile.isLoaded) {
      return (
        <View style={Styles.loadingView}>
          <ActivityIndicator size='large' animating />
        </View>
      )
    }

    return (
      <View>

        <Modal
          style={Styles.bottomModal}
          isVisible
          onBackdropPress={() => this.props.onFinish(false)} >

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
              minDate={this.state.calMin}
              maxDate={this.state.calMax}
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
              <Image source={require('../../Extras/Assets/Images/logo.png')} style={{ width: 40, height: 40 }} />
              <Text style={Styles.subsectionTitle}>   REQUEST A TEACHER</Text>
            </View>

            <Divider />

            <RequestSection
              title='Requested Teacher'
              content={(this.props.requestedTeacher) ? `${this.props.requestedTeacher.name}` : 'No Teacher Selected'} />

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
                text={(!this.state.requesting) ? 'Confirm Request' : null}
                disabled={!(this.props.requestedTeacher && this.state.requestedDate && (this.state.requestedDay === 'A' || this.state.requestedDay === 'B') && !this.state.requesting)}
                onPress={this.handleRequest}>
                {(this.state.requesting)
                  ? <ActivityIndicator size='large' animating />
                  : null
                }
              </BlueButton>
            </View>

          </View>

        </Modal>

      </View>
    )
  }
}

export default RequestTeacherPopup
