export default `
  type Seminar {
    id: ID!
    title: String!
    description: String!
    content: String!
    date: Date!
    speaker: String!
    location: String!
    onCampus: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input SeminarCreateData {
    title: String!
    description: String!
    content: String!
    date: String!
    speaker: String!
    location: String!
    onCampus: Boolean!
  }

  input SeminarUpdateData {
    title: String
    description: String
    content: String
    date: String
    speaker: String
    location: String
    onCampus: Boolean
  }
`