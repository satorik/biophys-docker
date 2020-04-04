import { gql } from '@apollo/client'

export const GET_YEARS = gql`
  query getScheduleYears($year: Int, $term: Int) {
    years(year: $year, term: $term){
      id
      title
      timetable {
        id
        dayId
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
  }
`

export const CREATE_YEAR = gql`
  mutation createScheduleYear($inputData: ScheduleYearCreateData!) {
    createScheduleYear(inputData: $inputData) {
      id
      title
      timetable{
        id
        dayId
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
  }
`

export const DELETE_YEAR = gql`
  mutation deleteScheduleYear($id: ID!) {
    deleteScheduleYear(id: $id) 
  }
`
export const UPDATE_YEAR = gql`
  mutation updateScheduleYear($id: ID!, $inputData: ScheduleYearUpdateData!) {
    updateScheduleYear(id: $id, inputData: $inputData) {
        id
        title
    }
  }
`

export const CREATE_TIMETABLE = gql`
  mutation createScheduleTimetable($yearId: ID!, $dayId: ID!, $inputData: ScheduleTimetableCreateData!) {
    createScheduleTimetable(yearId: $yearId, dayId: $dayId, inputData: $inputData) {
      timetable {
        id
        dayId
        timeFrom
        timeTo
        lector
        discipline
        lectureHall
        startDate
        isEven
        isDouble
      }
      double {
        id
        isDouble
      }
    }
  }
`

export const UPDATE_TIMETABLE = gql`
  mutation updateScheduleTimetable($id: ID!, $inputData: ScheduleTimetableUpdateData!) {
    updateScheduleTimetable(id: $id, inputData: $inputData) {
      id
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

export const DELETE_TIMETABLE = gql`
  mutation deleteScheduleTimetable($id: ID!) {
    deleteScheduleTimetable(id: $id) {
      id
      double {
        id
        isDouble
      }
    }
  }
`