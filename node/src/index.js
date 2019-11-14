import server from './server'
import populate from './utils/populate'
import express from 'express'
import path from 'path'

const app = express()
app.use('/images', express.static(path.join(__dirname, 'images')))

server.applyMiddleware({ app })

populate(false).
  then(res => {
    app.listen({ port: process.env.PORT || 4000 }, () => {
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    })    
  }
)


