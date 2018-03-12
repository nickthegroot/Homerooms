import Moment from 'moment'

export function getNextSeminar () {
  let nextSeminarTuesday = Moment().day(7 + 2).hour(13).minute(30)
  let nextSeminarWednesday = Moment().day(7 + 3).hour(13).minute(30)

  return (nextSeminarTuesday.isBefore(nextSeminarWednesday))
    ? nextSeminarTuesday
    : nextSeminarWednesday
}

export function getBothSeminars () {
  let nextSeminarTuesday = Moment().day(7 + 2).hour(13).minute(30)
  let nextSeminarWednesday = Moment().day(7 + 3).hour(13).minute(30)

  return [ nextSeminarTuesday, nextSeminarWednesday ]
}
