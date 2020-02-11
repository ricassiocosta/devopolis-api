const mongoose = require('mongoose');
const Post = require('../models/Post');
const Dev = require('../models/Dev');

module.exports = {
  async index(req, res) {
    const { dev_id } = req.query;

    const posts = await Post.find({
      author: mongoose.Types.ObjectId(dev_id),
    });

    return res.json(posts);
  },
};
