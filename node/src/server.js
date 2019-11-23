import {  ApolloServer } from 'apollo-server-express'
import { schema } from './schema'
import { models } from './models'
import fs from 'fs'

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
 
    const stream = fs.createWriteStream('errors.log', {flags: 'a'})
    const now = new Date()
    stream.write(now.toISOString())
    stream.write(JSON.stringify(err, null, '\t'))
    stream.on('error', error => {console.log('couldnot save to file', error)})
    return err
  }
})

export {server as default}