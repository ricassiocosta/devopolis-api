const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const { DATABASE_USERNAME, DATABASE_PASSWORD } = require('./env')

const server = express()

// Connection with MongoDB Atlas
mongoose.connect(`mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@mongodb-altlas-kizru.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Server configuration
server.use(express.json())
server.use(routes)

server.listen(5000)
