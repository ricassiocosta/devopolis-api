const searchApplication = require('../application/search.application')

module.exports = {
  async index (req, res) {
    const { search_by: searchBy, search_query: searchQuery } = req.query

    try {
      const devs = await searchApplication.execute(searchBy, searchQuery)
      return res.json({ devs })
    } catch (err) {
      console.log({ err })
      return res.sendStatus(500)
    }
  }
}
