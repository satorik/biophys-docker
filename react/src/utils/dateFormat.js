export const getDateToLocal = date => {
  const localDate = new Date(date)
  const options = {day: 'numeric', month: 'long', year: 'numeric', timeZone:'UTC' }
  return localDate.toLocaleString('ru', options)
}

export const getTimeToLocal = timeString => {
  const localTime = new Date('1970-01-01T' + timeString)
  const options = {hour: 'numeric', minute: 'numeric', timeZone:'UTC'}
  return localTime.toLocaleString('ru', options)
}

export const getDateTimeToLocal = datetime => {
  const localDate = new Date(datetime)
  const options = {day: 'numeric', month: 'long', year: 'numeric', hour:'numeric', minute: '2-digit', timeZone:'UTC'}
  return localDate.toLocaleString('ru', options)
}