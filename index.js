const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./src/routes')

dotenv.config()

const { DATABASE_USERNAME, DATABASE_PASSWORD, PORT } = require('./src/env')

const server = express()

// Connection with MongoDB Atlas
mongoose.connect(`mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@mongodb-altlas-kizru.mongodb.net/test?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Server configuration
server.use(express.json())
server.use(routes)

server.listen(PORT)
