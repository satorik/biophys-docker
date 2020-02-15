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

    days
  }
  `
const ScheduleByYear = ({yearId, currentWeek}) => {
  
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [lectureMode, setLectureMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedDay, setUpdatedDay] = React.useState({})
  const [updatedLecture, setUpdatedLecture] = React.useState({})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)

  
  const { loading, error, data } = useQuery(GET_SCHEDULE, {variables: {yearId}})
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
 
  const {timetable, days} = data

  const timetableByDay = timetable.reduce((acc, elem) => {
    acc[elem.day.title] = (acc[elem.day.title] || []).concat(elem)
    return acc
  }, {})

  console.log()
  return (
    <div>
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
        {
          mode.isCreating && <div>
              

          </div>
        }
        {
          Object.keys(timetableByDay).length < 6 && <div>
            <button className="btn btn-block btn-outline-success" onClick={setMode({...mode, isCreating: true})}>Добавить расписание на новый день</button>
          </div>
        }
    </div>
  )
}

export default ScheduleByYear
