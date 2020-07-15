export default `

  enum USERROLE {
    ADMIN
    USER
  }

  enum USERSTATUS {
    CREATED
    VALIDATED
    APPROVED
    MESSAGE SENT
  }

  type User {
    id: ID!
    email: String!
    role: USERROLE!
    status: USERSTATUS!
    username: String!
    createdAt: Date!
    updatedAt: Date!
    userUpdated: String!
  }

  type authData {
    userId: ID
    token: String
    username: String
    tokenExpiration: Int
    role: USERROLE
    message: String
    code: Int
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