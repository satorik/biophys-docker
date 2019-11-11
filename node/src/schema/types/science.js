const SciencePeople = `
  type SciencePeople {
    id: ID!
    firstname: String!
    middlename: String
    lastname: String!
    desc: String
    tel: String
    mail: String
    birthday: String
    type: String!
  }
`

const ScienceArticle = `
  type ScienceArticle {
    id: ID!
    author: String!
    title: String!
    journal: String!
  }
`


const ScienceGroup = `
  type ScienceGroup {
    id: ID!
    title: String!
    desc: String
    tel: String
    imageUrl: String
    mail: String
    room: String
    people: [SciencePeople!]!
    articles: [ScienceArticle!]!
  }
`

const ScienceRoute = `
  type ScienceRoute {
    id: ID!
    title: String!
    desc: String!
    scienceGroups(id: ID): [ScienceGroup!]
  }
`

export default [ScienceRoute, ScienceGroup, ScienceArticle, SciencePeople]