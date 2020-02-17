const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
  async index (req, res) {
    const devs = await Dev.find()
    return res.json(devs)
  },
  async store (req, res) {
    const { github_username: githubUsername, techs } = req.body

    let dev = await Dev.findOne({ github_username: githubUsername })

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
    const { followed_id: followedId } = req.params
    const { dev_id: devId } = req.query

    const dev = await Dev.findOne({ _id: devId })

    if (!dev.followedList.includes(followedId)) {
      await Dev.updateOne(
        { _id: devId },
        { $push: { followedList: followedId } }
      )
      return res.json({ sucess: 'Seguindo!' })
    }
    return res.json({ error: 'Você já o segue!' })
  },
  async update (req, res) {
    const { followed_id: followedId } = req.params
    const { dev_id: devId } = req.query

    const dev = await Dev.findOne({ _id: devId })

    if (!dev.followedList.includes(followedId)) {
      await Dev.updateOne(
        { _id: devId },
        { $push: { followedList: followedId } }
      )
      return res.json({ sucess: 'Seguindo!' })
    }
    return res.json({ error: 'Você já o segue!' })
  }
}
