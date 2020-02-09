const mongoose = require('mongoose')
const dev = require('./Dev')

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    posts: Number,
    collab_Project: Number,
    friendList: {
        type: dev
    }
})

module.exports = mongoose.model('Dev', DevSchema)