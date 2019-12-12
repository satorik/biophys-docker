export default () =>  {

  const getStartDate = (date) => {
    let startMonth = 0
    let startDay = 0
    if (date.getMonth() >= 8 && date.getMonth() <= 11) {
      startMonth = 8
    }
    else if (date.getMonth() >= 1 && date.getMonth() <= 3) {
      startMonth = 1
    }

    else return {startDate: null, startMonth: null}

    if (new Date(date.getFullYear(),startMonth, 1).getDay() === 0) {
      startDay = 2
    }
    else {
      startDay = 1
    }
    
    return {startDate: new Date(date.getFullYear(),startMonth, startDay), startMonth: startMonth}
  }


  let currentDate = new Date() 
  const {startDate, startMonth} = getStartDate(currentDate)

  if (startMonth === null) return {currentWeek: null, currentTerm: null, currentYear: currentDate.getFullYear()}

  const weekNumber =  Math.ceil(( ( (currentDate - startDate) / 86400000) + 1)/7)
  const term = startMonth === 1 ? 2 : 1

  return {currentWeek: weekNumber, currentTerm: term, currentYear: currentDate.getFullYear()}
  }

  

