const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const PostController = require('./controllers/PostController')
const ProfileController = require('./controllers/ProfileController')
const DashboardController = require('./controllers/DashboardController')

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/devs', DevController.index)
routes.post('/devs/follow/:username', DevController.follow)
routes.delete('/devs/unfollow/:username', DevController.unfollow)

routes.get('/search', SearchController.index)

routes.post('/posts', upload.single('thumbnail'), PostController.store)
routes.get('/posts/:username', PostController.show)

routes.get('/dashboard', DashboardController.index)

routes.get('/profile', ProfileController.index)

module.exports = routes
