import {  ApolloServer } from 'apollo-server-express'
import { schema } from './schema'
import { models } from './models'
import isAuth from './middleware/isAuth'
import fs from 'fs'

const server = new ApolloServer({ 
  schema,
  context: (req) => {

    return {
      models,
      auth: isAuth(req)
    }
  },
  formatError: (err) => {
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