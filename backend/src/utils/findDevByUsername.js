const Dev = require('../models/Dev')

module.exports = async function findDevByUsername (username) {
  const dev = await Dev.findOne({ github_username: username })
  return dev
}
