const mongoose = require('mongoose');

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  posts: Number,
  collab_Project: Number,
  followedList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dev'
    }
  ]
})

module.exports = mongoose.model('Dev', DevSchema)
