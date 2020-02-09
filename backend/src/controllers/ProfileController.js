const Post = require('../models/Post')
const Dev = require('../models/Dev')
const mongoose = require('mongoose')

module.exports = {
    async index(req, res) {
        const { dev_id } = req.query

        const posts = await Post.find({
            author: mongoose.Types.ObjectId(dev_id)
        })

        return res.json(posts)
    }
}