const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express()

// Connection with MongoDB Atlas
mongoose.connect(
  'mongodb+srv://kozta_atlas:hcgbywxg@mongodb-altlas-kizru.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

// Server configuration
server.use(express.json())
server.use(routes)

server.listen(5000)
