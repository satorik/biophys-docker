export default `
  type Conference {
    id: ID!
    title: String!
    description: String!
    content: String!
    imageUrl: String!
    dateFrom: Date!
    dateTo: Date!
    location: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input ConferenceCreateData {
    title: String!
    description: String!
    content: String!
    image: Upload!
    dateFrom: Date!
    dateTo: Date!
    location: String!
  }

  input ConferenceUpdateData {
    title: String
    description: String
    content: String
    image: Upload
    dateFrom: Date
    dateTo: Date
    location: String
  }
`