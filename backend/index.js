const express = require('express')
const mongoose = require('mongoose')

const server = express()
server.use(express.json())
mongoose.connect('mongodb+srv://kozta_atlas:hcgbywxg@mongodb-altlas-kizru.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

server.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

server.listen(5000)