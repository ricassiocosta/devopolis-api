const Dev = require('../models/Dev')

const searchByUsername = async (searchQuery) => {
  const devs = await Dev.find({
    $or: [
      { github_username: new RegExp(searchQuery, 'gi') }
    ]
  })
  return devs
}

const searchByTechs = async (searchQuery) => {
  const devs = await Dev.find({
    techs: {
      $in: new RegExp(searchQuery, 'gi')
    }
  })
  return devs
}

module.exports = {
  async execute (searchBy = 'github_username', searchQuery) {
    const methodsToSearch = {
      github_username: searchByUsername,
      techs: searchByTechs
    }

    return methodsToSearch[searchBy](searchQuery)
  }
}
