import moment from 'moment'

export function getNextSeminar () {
  let nextSeminarTuesday = moment().day('Tuesday').hour(13).minute(30).second(0).millisecond(0)
  let nextSeminarWednesday = moment().day('Wednesday').hour(13).minute(30).second(0).millisecond(0)

  return (nextSeminarTuesday.isBefore(nextSeminarWednesday))
    ? nextSeminarTuesday
    : nextSeminarWednesday
}

export function getBothSeminars () {
  let nextSeminarTuesday = moment().day('Tuesday').hour(13).minute(30).second(0).millisecond(0)
  let nextSeminarWednesday = moment().day('Wednesday').hour(13).minute(30).second(0).millisecond(0)

  return [ nextSeminarTuesday, nextSeminarWednesday ]
}
