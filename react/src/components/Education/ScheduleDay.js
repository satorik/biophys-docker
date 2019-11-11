import React from 'react'
import ScheduleTime from './ScheduleTime'
import {getTimeToLocal} from '../../utils/dateFormat'

const ScheduleDay = ({scheduleDay, dayTitle, currentWeek}) => {
  //finding doubles

  const startTime = getTimeToLocal(scheduleDay[0].timeFrom)

  const consolidatedDayWithDoubles = []
  scheduleDay.forEach( elem => {
    if (elem.isDouble) {
      const doubleArray = []
      const doubleElem = scheduleDay.find(x => +x.id === elem.isDouble)
      doubleArray.push(elem)
      doubleArray.push(doubleElem)
      scheduleDay.splice(scheduleDay.indexOf(doubleElem), 1)
      consolidatedDayWithDoubles.push(doubleArray)  
    }
    else {
      consolidatedDayWithDoubles.push(elem)
    }
  })

  return (
    <>
    <div className="row">
      <div className="bg-dark text-white col-md-12 d-flex p-3 justify-content-between">
          <h5 className="m-0">{dayTitle}</h5>
          <p>Начало занятий: {startTime}</p>
      </div>
    </div>
    <div>
       {consolidatedDayWithDoubles.map((scheduleDayTime, index) => <ScheduleTime consolidatedTime={scheduleDayTime} currentWeek = {currentWeek} key={index}/>)} 
    </div>
    </>
  )
}

export default ScheduleDay
