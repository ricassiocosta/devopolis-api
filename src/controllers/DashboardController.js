const Post = require('../models/Post')
const Dev = require('../models/Dev')

module.exports = {
  async index (req, res) {
    const { id: devId } = res.locals.user

    const dev = await Dev.findOne({ _id: devId })
    const dashboardParticipants = dev.followedList
    const posts = await Post.find({
      author: {
        $in: dashboardParticipants
      }
    })

    return res.json({ posts })
  }
}
