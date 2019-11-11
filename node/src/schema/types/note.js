export default `
  type Note {
    id: ID!
    title: String!
    description: String!
    content: String
    onTop: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input NoteCreateData {
    title: String!
    description: String!
    content: String
    onTop:Boolean
  }

  input NoteUpdateData {
    title: String
    description: String
    content: String
    onTop:Boolean
  }
`