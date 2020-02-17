const Dev = require("../models/Dev")

module.exports = {
  async index (req, res) {
    const { techs } = req.query

    const devs = await Dev.find({
      techs: {
        $in: techs
      }
    })
    return res.json({ devs })
  }
}
