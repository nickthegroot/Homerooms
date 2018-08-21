import moment from 'moment'

export function getNextSeminar () {
  let nextSeminarTuesday = moment().day('Tuesday').hour(13).minute(30).second(0).millisecond(0)
  if (moment().isAfter(nextSeminarTuesday)) {
    nextSeminarTuesday.add(1, 'weeks')
  }
  let nextSeminarWednesday = moment().day('Wednesday').hour(13).minute(30).second(0).millisecond(0)
  if (moment().isAfter(nextSeminarWednesday)) {
    nextSeminarWednesday.add(1, 'weeks')
  }

  return (nextSeminarTuesday.isBefore(nextSeminarWednesday))
    ? nextSeminarTuesday
    : nextSeminarWednesday
}

export function getBothSeminars () {
  let nextSeminarTuesday = moment().day('Tuesday').hour(13).minute(30).second(0).millisecond(0)
  if (moment().isAfter(nextSeminarTuesday)) {
    nextSeminarTuesday.add(1, 'weeks')
  }
  let nextSeminarWednesday = moment().day('Wednesday').hour(13).minute(30).second(0).millisecond(0)
  if (moment().isAfter(nextSeminarWednesday)) {
    nextSeminarWednesday.add(1, 'weeks')
  }

  return [ nextSeminarTuesday, nextSeminarWednesday ]
}
