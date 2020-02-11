const Post = require('../models/Post');
const Dev = require('../models/Dev');

module.exports = {
  async index(req, res) {
    const { dev_id } = req.headers;

    const dev = await Dev.findOne({ _id: dev_id });
    dashboard_participants = dev.followedList;
    const posts = await Post.find({
      author: {
        $in: dashboard_participants,
      },
    });

    return res.json({ posts });
  },
};
