const mongoose = require('mongoose');
const Post = require('../models/Post');

module.exports = {
  async index (req, res) {
    const { dev_id: devId } = req.query

    const posts = await Post.find({
      author: mongoose.Types.ObjectId(devId)
    })

    return res.json(posts)
  }
}
