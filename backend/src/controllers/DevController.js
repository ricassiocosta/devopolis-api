const axios = require('axios')
const mongoose = require('mongoose')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(req, res) {
        const devs = await Dev.find()
        return res.json(devs)
    },

    async store (req, res) {
        const { github_username, techs } = req.body

        let dev = await Dev.findOne({ github_username })
    
        if(!dev) {
            const response = await axios.get(`https://api.github.com/users/${ github_username }`)
            const { name = login, avatar_url, bio } = response.data
        
            const techsArray = parseStringAsArray(techs)
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray
            })
        }
    
        return res.json(dev)
    },
    async update(req, res) {
        const { friend_id } = req.params
        const { dev_id } = req.query

        const dev = await Dev.findOne({_id: dev_id})
        
        if(!dev.friendList.includes(friend_id)){
            await Dev.updateOne(
                {_id: dev_id},
                {$push: {friendList: friend_id}}
            )
            return res.json({ok: true})
        } else {
            return res.json({error : "Você já o segue!"})
        }
    }
}