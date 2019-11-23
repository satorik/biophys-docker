const SciencePeople = `
  enum VECTOR {
    UP
    DOWN
  }

  type SciencePeople {
    id: ID!
    firstname: String!
    middlename: String
    lastname: String!
    description: String
    tel: String
    mail: String
    birthday: String
    position: Int!
    url: String
    type: SciencePeopleType!
  }

  enum SciencePeopleType {
    STAFF
    STUDENT
  }

  input SciencePeopleCreateData {
    firstname: String!
    middlename: String
    lastname: String!
    description: String
    tel: String
    mail: String
    url: String
    birthday: String
    type: SciencePeopleType!
  }

  input SciencePeopleUpdateData {
    firstname: String
    middlename: String
    lastname: String
    description: String
    tel: String
    mail: String
    url: String
    birthday: String
    type: SciencePeopleType
  }
`

const ScienceArticle = `
  type ScienceArticle {
    id: ID!
    author: String!
    title: String!
    journal: String!
    position: Int!
  }

  input ScienceArticleCreateData {
    author: String!
    title: String!
    journal: String!
  }

  input ScienceArticleUpdateData {
    author: String
    title: String
    journal: String
  }
`

const ScienceGroup = `
  type ScienceGroup {
    id: ID!
    title: String!
    description: String!
    tel: String!
    imageUrl: String!
    mail: String!
    room: String!
    people: [SciencePeople!]
    articles: [ScienceArticle!]
  }

  input ScienceGroupCreateData {
    title: String!
    description: String!
    tel: String!
    image: Upload!
    mail: String!
    room: String!
    people: [SciencePeopleCreateData!]
    articles: [ScienceArticleCreateData!]
  }

  input ScienceGroupUpdateData {
    title: String
    description: String
    tel: String
    image: Upload
    mail: String
    room: String
    people: [SciencePeopleCreateData!]
    articles: [ScienceArticleCreateData!]
  }
`

const ScienceRoute = `
  type ScienceRoute {
    id: ID!
    title: String!
    description: String
    scienceGroups(id: ID): [ScienceGroup!]
  }

  input ScienceRouteCreateData {
    title: String!
    description: String
  }

  input ScienceRouteUpdateData {
    title: String
    description: String
  }
`

export default [ScienceRoute, ScienceGroup, ScienceArticle, SciencePeople]