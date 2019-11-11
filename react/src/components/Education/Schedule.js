import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import ScheduleByYear from './ScheduleByYear'
import getWeekNumber from '../../utils/getWeekNumber'


const GET_SCHEDULE_YEARS = gql`
  query getScheduleYears($calendarYear: Int) {
    years(calendarYear: $calendarYear){
      id
      title
    }
  }
`

const Schedule = () => {

  const [selectedYear, setSelectedYear] = React.useState(0)
  const { loading, error, data } = useQuery(GET_SCHEDULE_YEARS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const {years} = data
  const currentWeek = getWeekNumber()
  const isCurrentWeakEven = currentWeek % 2
  const bgColor = isCurrentWeakEven === 0 ? '#FAF1D6' : '#D9F1F1'

  const onChangeSelectedYear = (e) => {
    setSelectedYear(e.target.value)
  }

  console.log(selectedYear)

  return (
    <div className="container mt-5">
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-10">
            <select className="form-control bg-light" id="yearSelect" onChange={onChangeSelectedYear}>
              {
                years.map((year, index) => <option key={year.id} value={index}>{year.title}</option>)
              }
              </select>
          </div>
          <div className="col-md-2">
          <h5 className="p-1 text-center" style={{backgroundColor:bgColor}}>Неделя #{currentWeek}</h5>
          </div>
        </div>      
      </div>
      <ScheduleByYear yearId={years[selectedYear].id} currentWeek={currentWeek} />
    </div>
  )
}

export default Schedule
