const ScheduleDay = `
  type ScheduleDay {
    id: ID!
    title: String!
  }
`
const ScheduleTime = `
  type ScheduleTime {
    id: ID!
    timeFrom: String!
    timeTo: String!  
    orderNumber: Int!
  }
`
const ScheduleYear = `
  type ScheduleYear {
    id: ID!
    title: String!
    calendarYear: Int!
  }
 `
const ScheduleTimetable = `
  type ScheduleTimetable {
    id: ID!
    day: ScheduleDay!
    timeFrom: String!
    timeTo: String
    lector: String
    year: ScheduleYear!
    discipline: String!
    lectureHall: String
    startDate: String
    isEven: Int!
    isDouble: Int!
    isTimeRight: Boolean!
    orderNumber: Int!
  }
`

const EducationResourse = `
  type EducationResourse {
    id: ID!
    link: String!
    imageUrl: String
    desc: String!
  }
`

const EducationCourse = `
  type EducationCourse {
    id: ID!
    title: String!
    desc: String!
    resourses: [EducationResourse!]!
  }
`

export default [ScheduleDay, ScheduleTime, ScheduleYear, ScheduleTimetable, EducationResourse, EducationCourse]