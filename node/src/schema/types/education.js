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
    year: Int!
    term: Int!
    timetable: [ScheduleTimetable!]
  }

  input ScheduleYearCreateData {
    title: String!
    year: Int!
    term: Int!
  }

  input ScheduleYearUpdateData {
    title: String!
  }
 
  type ScheduleTimetable {
    id: ID!
    dayId: Int!
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

  type EducationDouble {
    id: ID!
    isDouble: Int!
  }

  type ScheduleTimetableCreateDataReturn {
    timetable: ScheduleTimetable!
    double: EducationDouble
  }

  type ScheduleTimetableDeleteDataReturn {
    id: ID!
    double: EducationDouble
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

  enum EXAMTYPE {
    EXAM
    TEST
  }

  enum FILETYPE {
    PDF,
    URL
  }

  type EducationCourse {
    id: ID!
    title: String!
    description: String!
    read: String!
    lector: String!
    exam: EXAMTYPE!
    resourses: [EducationResourse!]!
  }

  type EducationForm {
    id: ID!
    title: String!
  }

  type EducationResourse {
    id: ID!
    title: String!
    type: FILETYPE!
    image: String
    description: String
    fileLink: String!
    form: EducationForm!
  }

  input EducationCourseCreateData {
    title: String!
    description: String!
    read: String!
    lector: String!
    exam: EXAMTYPE!
  }

  input EducationCourseUpdateData {
    title: String
    description: String
    read: String
    lector: String
    exam: EXAMTYPE
  }

  input EducationResourseCreatePDFData {
    title: String!
    description: String
    type: FILETYPE!
    file: Upload!
    form: ID!
  }

  input EducationResourseCreateURLData {
    title: String!
    description: String
    type: FILETYPE! = URL
    file: String!
    form: ID!
  }

  input EducationResourseUpdatePDFData {
    title: String
    description: String
    type: FILETYPE
    file: Upload
    form: ID
  }

  input EducationResourseUpdateURLData {
    title: String
    description: String
    file: String
    form: ID
  }

`

export default Schedule