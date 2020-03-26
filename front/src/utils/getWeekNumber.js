export default () =>  {

  const getStartDate = (date) => {
    let startMonth = 0
    let startDay = 0
    let offset = false
    if (date.getMonth() >= 4 && date.getMonth() <= 11) {
      startMonth = 8
      if (date.getMonth() < 8) offset = true
    }
    else if (date.getMonth() >= 0 && date.getMonth() <= 3) {
      startMonth = 1
      if (date.getMonth() < 1) offset = true
    }

    else return {startDate: null, startMonth: null}

    if (new Date(date.getFullYear(),startMonth, 1).getDay() === 0) {
      startDay = 2
    }
    else {
      startDay = 1
    }
    
    return {startDate: new Date(date.getFullYear(),startMonth, startDay), startMonth: startMonth, offset}
  }


  let currentDate = new Date() 
  const {startDate, startMonth, isNotStarted} = getStartDate(currentDate)

  if (startMonth === null) return {currentWeek: null, currentTerm: null, currentYear: currentDate.getFullYear()}

 
  
  const term = startMonth === 1 ? 2 : 1
  if (isNotStarted) {
    return {currentWeek: null, currentTerm: term, currentYear: currentDate.getFullYear()}
  }
  
  const weekNumber =  Math.ceil(( ( (currentDate - startDate) / 86400000) + 1)/7)
  return {currentWeek: weekNumber, currentTerm: term, currentYear: currentDate.getFullYear()}
  }

  

