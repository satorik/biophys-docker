export default `

  enum USEEROLE {
    ADMIN
    USER
  }

  type User {
    id: ID!
    email: String!
    role: USEEROLE!
  }

  type authData {
    userId: ID!
    token: String!
    username: String!
    tokenExpiration: Int!
  }

  input UserCreateData {
    email: String!
    username: String!
    password: String!
  }

  input UserLoginData {
    email: String!
    password: String!
  }
`