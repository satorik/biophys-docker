import server from './server'
import populate from './utils/populate'
import express from 'express'
import path from 'path'

const app = express()
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/files', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.use('/files', express.static(path.join(__dirname, 'files')))

server.applyMiddleware({ app })

populate(true).
  then(res => {
    app.listen({ port: process.env.PORT || 4000 }, () => {
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    })    
  }
)


