const mutation =   `
  type Mutation {
    createBlogpost(inputData: BlogpostCreateData!): Blogpost!
    updateBlogpost(id: ID!, inputData: BlogpostUpdateData!): Blogpost!
    deleteBlogpost(id: ID!): ID!
    createConference(inputData: ConferenceCreateData!): Conference!
    updateConference(id: ID!, inputData: ConferenceUpdateData!): Conference!
    deleteConference(id: ID!): ID!
    createSeminar(inputData: SeminarCreateData!): Seminar!
    updateSeminar(id: ID!, inputData: SeminarUpdateData!): Seminar!
    deleteSeminar(id: ID!): ID!
    createNote(inputData: NoteCreateData!): Note!
    updateNote(id: ID!, inputData: NoteUpdateData!): UpdatedNoteData!
    deleteNote(id: ID!): ID!
    createScienceArticle(scienceGroupId: ID!, inputData: ScienceArticleCreateData!): ScienceArticle!
    updateScienceArticle(id: ID!, inputData: ScienceArticleUpdateData!): ScienceArticle!
    deleteScienceArticle(id: ID!):Int!
    createSciencePerson(scienceGroupId: ID!, inputData: SciencePeopleCreateData!): SciencePeople!
    updateSciencePerson(id: ID!, inputData: SciencePeopleUpdateData!): SciencePeople!
    deleteSciencePerson(id: ID!):Int!
    createScienceGroup(scienceRouteId: ID!, inputData: ScienceGroupCreateData!): ScienceGroup!
    updateScienceGroup(id: ID!, inputData: ScienceGroupUpdateData!): ScienceGroup!
    deleteScienceGroup(id: ID!):ID!
    createScienceRoute(inputData: ScienceRouteCreateData!): ScienceRoute!
    updateScienceRoute(id: ID!, inputData: ScienceRouteUpdateData!): ScienceRoute!
    deleteScienceRoute(id: ID!):ID!
    moveSciencePerson(id: ID!, vector: VECTOR!): [SciencePeople!]!
    moveScienceArticle(id: ID!, vector: VECTOR!): [ScienceArticle!]!
    createHistory(section: SECTION! = HISTORY, inputData: HistoryCreateData): HistoryText!
    updateHistory(section: SECTION! = HISTORY, inputData: HistoryUpdateData): HistoryText!
    deleteHistory(section: SECTION! = HISTORY): Boolean!
    createDepartmentPerson(inputData: DepartmentStaffCreateData): DepartmentStaff!
    updateDepartmentPerson(id: ID!, inputData: DepartmentStaffUpdateData): DepartmentStaff!
    deleteDepartmentPerson(id: ID!): Int!
    moveDepartmentPerson(id: ID!, vector: VECTOR!):[DepartmentStaff!]!
    createPartnership(inputData: DepartmentPartnershipCreateData):DepartmentPartnership!
    updatePartnership(id: ID!, inputData: DepartmentPartnershipUpdateData):DepartmentPartnership!
    deletePartnership(id: ID!): ID!
    createPrint(inputData: DepartmentPrintCreateData):DepartmentPrint!
    updatePrint(id: ID!, inputData: DepartmentPrintUpdateData):DepartmentPrint!
    deletePrint(id: ID!): ID!
    createScheduleYear(inputData: ScheduleYearCreateData): ScheduleYear!
    updateScheduleYear(id: ID!, inputData: ScheduleYearUpdateData): ScheduleYear!
    deleteScheduleYear(id: ID!): ID!
    createScheduleTimetable(yearId: ID!, dayId: ID!, inputData: ScheduleTimetableCreateData!): ScheduleTimetableCreateDataReturn!
    updateScheduleTimetable(id: ID!, inputData: ScheduleTimetableUpdateData!): ScheduleTimetable!
    deleteScheduleTimetable(id: ID!): ScheduleTimetableDeleteDataReturn!
    updateAdmission(section: SECTION! = ADMISSION, inputData: AdmissionUpdateData): AdmissionText!
    createAdmission(section: SECTION! = ADMISSION, inputData: AdmissionCreateData): AdmissionText!
    deleteAdmission(section: SECTION! = ADMISSION): Boolean!
    createEducationCourse(inputData: EducationCourseCreateData!): EducationCourse!
    updateEducationCourse(id: ID!, inputData: EducationCourseUpdateData!): EducationCourse!
    deleteEducationCourse(id: ID!): ID!
    createEducationResourse(courseId: ID!, filetype: FILETYPE!,  inputData: EducationResourseCreateData!): EducationResourse!
    updateEducationResourse(id: ID!, filetype: FILETYPE!, inputData: EducationResourseUpdateData!): EducationResourse!
    deleteEducationResourse(id: ID!): ID!
    createUser(inputData: UserCreateData!): Boolean!
    loginUser(inputData: UserLoginData!): authData!
    activateUser(hashedString: String!): authData!
    updateUser(id: ID!, status: USERSTATUS!): User!
    deleteUser(id: ID!): ID!
    getRole(id: ID!): USERROLE!
    recoverPassword(email: String!): String!
  }
`

export default mutation