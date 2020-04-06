const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
  async index (req, res) {
    const devs = await Dev.find()
    return res.json(devs)
  },
  async show (req, res) {
    const { username } = req.params
    const dev = await Dev.findByUsername(username)
    return res.json(dev)
  },
  async store (req, res) {
    const { github_username: githubUsername, techs } = req.body

    let dev = await Dev.findByUsername(githubUsername)

    if (!dev) {
      const response = await axios.get(`https://api.github.com/users/${githubUsername}`)
      const { name, avatar_url: avatarUrl, bio } = response.data

      dev = await Dev.create({
        github_username: githubUsername,
        name,
        avatar_url: avatarUrl,
        bio,
        techs
      })
    }

    return res.json(dev)
  },
  async follow (req, res) {
    const { username } = req.params
    const { id: devId } = res.locals.user

    const dev = await Dev.findOne({ _id: devId })
    const devToFollow = await Dev.findByUsername(username)

    if (devToFollow && !dev.followedList.includes(devToFollow._id)) {
      await Dev.updateOne(
        { _id: devId },
        { $push: { followedList: devToFollow._id } }
      )
      return res.json({ sucess: 'Seguindo!' })
    }
    return res.json({ error: 'Você já o segue!' })
  },
  async unfollow (req, res) {
    const { username } = req.params
    const { id: devId } = res.locals.user

    const dev = await Dev.findOne({ _id: devId })
    const devToFollow = await Dev.findByUsername(username)

    if (devToFollow && dev.followedList.includes(devToFollow._id)) {
      await Dev.updateOne(
        { _id: devId },
        { $pull: { followedList: devToFollow._id } }
      )
      return res.json({ sucess: 'Você deixou de segui-lo!' })
    }
    return res.json({ error: 'Você não o seguia!' })
  }
}
