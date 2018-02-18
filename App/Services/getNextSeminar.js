import Moment from 'moment'

function getNextSeminar () {
  let nextSeminarTuesday = Moment().day(7 + 2).hour(12).minute(30)
  let nextSeminarWednesday = Moment().day(7 + 3).hour(12).minute(30)

  return (nextSeminarTuesday.isBefore(nextSeminarWednesday))
    ? nextSeminarTuesday
    : nextSeminarWednesday
}

export default getNextSeminar
