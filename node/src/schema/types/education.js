const Education = `
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

  type EducationCourse {
    id: ID!
    title: String!
    description: String!
    read: String!
    lector: String!
    exam: EXAMTYPE!
    resourses: [EducationResourse!]!
  }

  enum SECTIONTYPE {
    MULTY,
    SINGLE
  }

  enum FILETYPE {
    PDF,
    URL
  }

  type EducationForm {
    id: ID!
    type: SECTIONTYPE
    title: String!
    filetype: FILETYPE!
    parentForm: EducationForm
    subSections: [EducationForm!]
  }

  type EducationResourse {
    id: ID!
    title: String!
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

  input EducationResourseCreateData {
    title: String!
    description: String
    fileLink: String
    file: Upload
    educationFormId: ID!
    subSectionText: String
    subSectionId: ID
  }

  input EducationResourseUpdateData {
    title: String
    description: String
    fileLink: String
    file: Upload
    educationFormId: ID
    subSectionText: String
    subSectionId: ID
  }

`

export default Education