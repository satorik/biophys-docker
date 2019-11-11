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

    else {return null}

    if (new Date(date.getFullYear(),startMonth, 1).getDay() === 0) {
      startDay = 2
    }
    else {
      startDay = 1
    }
    
    return new Date(date.getFullYear(),startMonth, startDay)
  }


  let currentDate = new Date() 
  const startDate = getStartDate(currentDate)

  return Math.ceil(( ( (currentDate - startDate) / 86400000) + 1)/7)
  }

  

