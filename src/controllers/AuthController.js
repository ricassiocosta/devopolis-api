
const axios = require('axios')
const jwt = require('jsonwebtoken')

const secret = 'lucaslindo'

const Dev = require('../models/Dev')

const { GET_USER_URL } = require('../constants')
const { AUTH_TOKEN_TTL } = require('../env')

function generateBase64Token ({ id, githubUsername, name, bio }) {
  const token = jwt.sign({
    sub: id,
    context: {
      github_username: githubUsername,
      name,
      bio
    }
  }, secret, { expiresIn: AUTH_TOKEN_TTL })

  return Buffer.from(token).toString('base64')
}

module.exports = {
  async index (req, res) {
    const githubToken = req.query.github_token

    const response = await axios.get(GET_USER_URL, {
      headers: {
        Authorization: `token ${githubToken}`
      }
    })

    const { data } = response
    const { github_username: githubUsername, name, bio } = data

    let existingUser = await Dev.findByUsername(githubUsername)
    if (!existingUser) {
      existingUser = await Dev.create({
        github_username: githubUsername,
        name,
        bio
      })
    }

    const token = generateBase64Token({
      id: existingUser._id,
      githubUsername,
      name,
      bio
    })

    return res.json({ token })
  }
}
