const query =   `
  type Query {
    blogposts(offset: Int, limit: Int):BlogpostWithTotal
    conferences(offset: Int, limit: Int):[Conference]!
    seminars(offset: Int, limit: Int):[Seminar]!
    notes(offset: Int, limit: Int):[Note]!
    links: [NavigationLink!]!
    staff: [DepartmentStaff!]!
    prints: [DepartmentPrint!]!
    partnership: [DepartmentPartnership!]!
    courses(id: ID): [EducationCourse!]
    resourses(educationCourseId: ID!): [EducationResourse!]
    form(id: ID!):EducationForm!
    years(id: ID, calendarYear: Int, term: Int): [ScheduleYear!]!
    days:[String!]! 
    timeHeaders:[ScheduleTime!]!
    timetable(yearId: ID, dayId: ID, timeId: ID): [ScheduleTimetable!]!
    scienceRoutes(id: ID): [ScienceRoute!]
    scienceGroups(id: ID, scienceRouteId: ID): [ScienceGroup!]
    history(section: SECTION! = HISTORY):HistoryText
    admission(section: SECTION! = ADMISSION):AdmissionText
  }
`

export default query