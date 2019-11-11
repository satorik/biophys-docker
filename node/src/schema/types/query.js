const query =   `
  type Query {
    blogposts(offset: Int, limit: Int):BlogpostWithTotal
    conferences(offset: Int, limit: Int):[Conference]!
    seminars(offset: Int, limit: Int):[Seminar]!
    notes(offset: Int, limit: Int):[Note]!
    links: [NavigationLink!]!
    text(section: String!): String!
    staff: [DepartmentStaff!]!
    prints: [DepartmentPrint!]!
    partnership: [DepartmentPartnership!]!
    courses(id: ID): [EducationCourse!]
    years(id: ID, calendarYear: Int): [ScheduleYear!]!
    timeHeaders:[ScheduleTime!]!
    timetable(yearId: ID, dayId: ID, timeId: ID): [ScheduleTimetable!]!
    scienceRoutes(id: ID): [ScienceRoute!]
    scienceGroups(id: ID, scienceRouteId: ID): [ScienceGroup!]
  }
`

export default query