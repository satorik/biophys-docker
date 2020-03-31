export const getDateToLocal = date => {
  const localDate = new Date(date)
  const options = {day: 'numeric', month: 'long', year: 'numeric', timeZone:'Europe/Moscow' }
  return localDate.toLocaleString('ru', options)
}

export const getTimeToLocal = timeString => {
  const localTime = new Date('1970-01-01T' + timeString)
  const options = {hour: 'numeric', minute: 'numeric', timeZone:'Europe/Moscow'}
  return localTime.toLocaleString('ru', options)
}

export const getDateTimeToLocal = datetime => {
  const localDate = new Date(datetime)
  const options = {day: 'numeric', month: 'long', year: 'numeric', hour:'numeric', minute: '2-digit', timeZone:'Europe/Moscow'}
  return localDate.toLocaleString('ru', options).replace(',', ' в ')
}