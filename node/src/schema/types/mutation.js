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
    createOneScienceArticle(groupId: ID!, inputData: ScienceArticleCreateData!): ScienceArticle!
    createManyScienceArticles(groupId: ID!, inputData: [ScienceArticleCreateData!]!): [ScienceArticle!]!
    updateOneScienceArticle(id: ID!, inputData: ScienceArticleUpdateData!): ScienceArticle!
    deleteOneScienceArticle(id: ID!):ID!
    deleteManyScienceArticles(ids: [ID!]!):[ID!]!
    createOneSciencePerson(groupId: ID!, inputData: SciencePeopleCreateData!): SciencePeople!
    createManySciencePeople(groupId: ID!, inputData: [SciencePeopleCreateData!]!): [SciencePeople!]!
    updateOneSciencePerson(id: ID!, inputData: SciencePeopleUpdateData!): SciencePeople!
    updateManySciencePeople(ids: [ID!]!, inputData: [SciencePeopleUpdateData!]!): [SciencePeople]!
    deleteOneSciencePerson(id: ID!):ID!
    deleteManySciencePeople(ids: [ID!]!):[ID!]!
    createScienceGroup(routeId: ID!, inputData: ScienceGroupCreateData!): ScienceGroup!
    updateScienceGroup(id: ID!, inputData: ScienceGroupUpdateData!): ScienceGroup!
    deleteScienceGroup(id: ID!):ID!
    createScienceRoute(inputData: ScienceRouteCreateData!): ScienceRoute!
    updateScienceRoute(id: ID!, inputData: ScienceRouteUpdateData!): ScienceRoute!
    deleteScienceRoute(id: ID!):ID!
  }
`

export default mutation