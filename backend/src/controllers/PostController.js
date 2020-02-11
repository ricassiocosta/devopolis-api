const Post = require('../models/Post');
const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { filename } = req.file;
    const { title, post } = req.body;
    const { dev_id } = req.headers;

    const dev = await Dev.findById(dev_id);
    if (!dev) {
      return res.status(400).json({
        error: 'user does not exist',
      });
    }

    const publication = await Post.create({
      author: dev_id,
      thumbnail: filename,
      title,
      post,
    });

    return res.json(publication);
  },
};
