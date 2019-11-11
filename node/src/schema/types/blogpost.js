export default `
  type Blogpost {
    id: ID!
    title: String!
    description: String!
    content: String!
    imageUrl: String!
    createdAt: Date
    updatedAt: Date
  }

  type BlogpostWithTotal {
    posts: [Blogpost]!
    total: Int!
  }

  input BlogpostCreateData {
    title: String!
    description: String!
    content: String!
    image: Upload!
  }

  input BlogpostUpdateData {
    title: String
    description: String
    content: String
    image: Upload
  }
`