const query =   `
  type Query {
    blogposts(offset: Int, limit: Int):BlogpostWithTotal
    conferences(offset: Int, limit: Int):[Conference]!
    seminars(offset: Int, limit: Int):[Seminar]!
    notes(offset: Int, limit: Int, top: Boolean):[Note]!
    links: [NavigationLink!]!
    staff: [DepartmentStaff!]!
    prints: [DepartmentPrint!]!
    partnership: [DepartmentPartnership!]!
    courses(id: ID): [EducationCourse!]
    resourses(educationCourseId: ID!): [EducationResourse!]
    forms(id: ID):[EducationForm!]
    form(id: ID!):EducationForm!
    years(id: ID, year: Int, term: Int): [ScheduleYear!]!
    days:[String!]! 
    timeHeaders:[ScheduleTime!]!
    timetable(yearId: ID, dayId: ID, timeId: ID): [ScheduleTimetable!]!
    scienceRoutes(id: ID): [ScienceRoute!]
    scienceGroups(id: ID, scienceRouteId: ID): [ScienceGroup!]
    history(section: SECTION! = HISTORY):HistoryText
    admission(section: SECTION! = ADMISSION):AdmissionText
    parentForm: EducationForm!
    subSections: [EducationForm!]
    users: [User!]!
    activateUser(hashedString: String!): authData!
  }
`

export default query