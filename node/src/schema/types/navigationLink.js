const NavigationLink =   `
  type NavigationLink {
    id: ID!
    title: String!
    path: String!
    level: Int!
    subLinks: [NavigationLink!]
    upLink: NavigationLink
  }  
`

export default NavigationLink