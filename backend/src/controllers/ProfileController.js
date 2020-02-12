const Post = require('../models/Post')
const mongoose = require('mongoose')

module.exports = {
    async index(req, res) {
        const { dev_id } = req.headers

        const posts = await Post.find({
            author: mongoose.Types.ObjectId(dev_id)
        })

        return res.json(posts)
    }
}