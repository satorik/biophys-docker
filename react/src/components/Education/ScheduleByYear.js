import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import ScheduleDay from './ScheduleDay'

const GET_SCHEDULE = gql`                    
  query getScheduleByYear($yearId: ID!){
    timetable(yearId: $yearId){
      id
      day {
        title
      }
      timeFrom
      timeTo
      lector
      discipline
      lectureHall
      startDate
      isEven
      isDouble
    }
  }
  `
const ScheduleByYear = ({yearId, currentWeek}) => {

  
  const { loading, error, data } = useQuery(GET_SCHEDULE, {variables: {yearId}})
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
 
  const {timetable} = data

  const timetableByDay = timetable.reduce((acc, elem) => {
    acc[elem.day.title] = (acc[elem.day.title] || []).concat(elem)
    return acc
  }, {})

  return (
        <div>
          {Object.keys(timetableByDay).map( key =>
              <ScheduleDay 
                key = {key}
                dayTitle = {key}
                currentWeek = {currentWeek}
                scheduleDay = {timetableByDay[key]}
              />
            )}
        </div>
  )
}

export default ScheduleByYear
