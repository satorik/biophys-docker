const getTimeToDate = (time) => {
  return Date.parse('01/01/2011 '+time)
}

export const getIsDouble = (lecture, timetable, id = null) => {
  let isDouble = 0
  timetable.forEach( time => {
    if (time.timeFrom !== null && time.timeTo !== null && id !== time.id){
      if (( getTimeToDate(time.timeFrom) <= getTimeToDate(lecture.timeFrom) && getTimeToDate(time.timeTo) >= getTimeToDate(lecture.timeTo)) ||
          ( getTimeToDate(lecture.timeFrom) <= getTimeToDate(time.timeTo) && getTimeToDate(lecture.timeTo) >= getTimeToDate(time.timeTo)) ||
          (getTimeToDate(lecture.timeTo) >= getTimeToDate(time.timeFrom) && getTimeToDate(lecture.timeTo) <= getTimeToDate(time.timeTo))
          ) {
            isDouble = time.id
          }
      }
    })
  let isOneDouble = true
  let isOneEven = true 
  
  if (isDouble !== 0) {
    isOneDouble = timetable.find(time => time.id === isDouble).isDouble === 0
    isOneEven = lecture.isEven === 0 || timetable.find(time => time.id === isDouble).isEven !== lecture.isEven
  }
  return {isDouble, isOneDouble, isOneEven}
}