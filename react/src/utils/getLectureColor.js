export default (currentWeek, lectureWeek) => {
  if (lectureWeek !== 0) {
    const isCurrentWeekEven = currentWeek % 2 === 0
    if (isCurrentWeekEven && lectureWeek === 2) {
      return '#FAF1D6'
    }
    else if (!isCurrentWeekEven && lectureWeek === 1) {
      return '#D9F1F1'
    }
    else return '#f8f9fa'
 }
 else return '#f8f9fa'
}