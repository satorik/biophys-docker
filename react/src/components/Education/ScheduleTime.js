import React from 'react'
import { getTimeToLocal, getDateToLocal } from '../../utils/dateFormat'

import getLectureColor from '../../utils/getLectureColor'
import ScheduleLecture from './ScheduleLecture'

const ScheduleTime = ({consolidatedTime, currentWeek}) => {

  const fullWidthLecture = 'col-10'
  const shortWidthLecture = 'col-4'

  if (Array.isArray(consolidatedTime)) {
    return <div className="text-center row" style={{height:'5rem'}}>
      {consolidatedTime.map(lecture =>
        <ScheduleLecture
          key={lecture.id}
          color={getLectureColor(currentWeek, lecture.isEven)}
          width = {shortWidthLecture}
          timeFrom = {getTimeToLocal(lecture.timeFrom)}
          timeTo = {lecture.timeTo && getTimeToLocal(lecture.timeTo)}
          discipline = {lecture.discipline}
          lector={lecture.lector}
          lectureHall={lecture.lectureHall}
          startFrom = {lecture.startDate && getDateToLocal(lecture.startDate)}
      />
      )}
    </div>
  }

  else {
    return <div className="text-center row" style={{height:'6rem'}}>
      <ScheduleLecture
        width = {consolidatedTime.isEven !== 0 ? shortWidthLecture : fullWidthLecture}
        isShift = {consolidatedTime.isEven === 2}
        color = {getLectureColor(currentWeek, consolidatedTime.isEven)}
        timeFrom = {getTimeToLocal(consolidatedTime.timeFrom)}
        timeTo = {consolidatedTime.timeTo && getTimeToLocal(consolidatedTime.timeTo)}
        discipline = {consolidatedTime.discipline}
        lector={consolidatedTime.lector}
        lectureHall={consolidatedTime.lectureHall}
        startFrom = {consolidatedTime.startDate && getDateToLocal(consolidatedTime.startDate)}
      />
    </div>
  }
  
}

export default ScheduleTime
