const mongoose = require('mongoose');
const Dev = require('./Dev');

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dev',
  },
  title: String,
  post: String,
  thumbnail: String,
});

module.exports = mongoose.model('Post', PostSchema);
