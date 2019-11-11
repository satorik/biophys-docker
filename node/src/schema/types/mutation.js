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
    updateNote(id: ID!, inputData: NoteUpdateData!): Note!
    deleteNote(id: ID!): ID!
  }
`

export default mutation