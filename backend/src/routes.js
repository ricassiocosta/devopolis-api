const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const PostController = require('./controllers/PostController')

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)

routes.get('/search', SearchController.index)

routes.post('/post', upload.single('thumbnail'),PostController.store)

module.exports = routes