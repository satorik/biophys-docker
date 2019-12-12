const Schedule = `
  type ScheduleDay {
    id: ID!
    title: String!
  }

  type ScheduleTime {
    id: ID!
    timeFrom: String!
    timeTo: String!  
    orderNumber: Int!
  }

  type ScheduleYear {
    id: ID!
    title: String!
    calendarYear: Int!
  }
 
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
  }

  input ScheduleTimetableCreateData {
    timeFrom: String!
    timeTo: String
    lector: String
    discipline: String!
    lectureHall: String
    startDate: String
    isEven: Int!
    isDouble: Int!
  }

  input ScheduleTimetableUpdateData {
    timeFrom: String
    timeTo: String
    lector: String
    discipline: String
    lectureHall: String
    startDate: String
    isEven: Int
    isDouble: Int
  }

  type EducationResourse {
    id: ID!
    link: String!
    imageUrl: String
    desc: String!
  }

  type EducationCourse {
    id: ID!
    title: String!
    desc: String!
    resourses: [EducationResourse!]!
  }
`

export default Schedule