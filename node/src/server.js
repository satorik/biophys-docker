import {  ApolloServer } from 'apollo-server-express'
import { schema } from './schema'
import { models } from './models'

const server = new ApolloServer({ 
  // typeDefs: typeDefs,
  // resolvers: resolvers,
  schema,
  context: {
    models
  },
  formatError: (err) => {
    // Don't give the specific errors to the client.
    console.log('Apollo to the Handle!!!!\r\n', err)
    
    // Otherwise return the original error.  The error can also
    // be manipulated in other ways, so long as it's returned.
    return err;
  }
})

export {server as default}