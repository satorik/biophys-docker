import Query from './query/'
import Mutation from './mutation/'
import NavigationLink from './link'
import scienceQuery from './query/science'

const resolvers = {
  Query: Query,
  Mutation: Mutation,
  NavigationLink: NavigationLink,
  ScienceRoute:  {scienceGroups : scienceQuery.scienceGroups}
}

//console.log(resolvers)

export { resolvers as default }