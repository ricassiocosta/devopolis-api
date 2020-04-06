const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const CallbackController = require('./controllers/CallbackController')
const AuthController = require('./controllers/AuthController')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const PostController = require('./controllers/PostController')
const DashboardController = require('./controllers/DashboardController')

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/github/callback', CallbackController.github)

routes.post('/auth', AuthController.index)

routes.post('/devs', DevController.store) // Create a Dev
routes.get('/devs', DevController.index) // Shows all Devs created
routes.get('/devs/:username', DevController.show) // Show a single Dev
routes.post('/devs/:username/follow', DevController.follow) // Follow a Dev
routes.delete('/devs/:username/unfollow', DevController.unfollow) // Unfollow a Dev

routes.get('/search', SearchController.index) // Search Devs by techs

routes.post('/posts', upload.single('thumbnail'), PostController.store) // Create posts
routes.get('/posts/:username', PostController.index) // Shows all dev's posts
routes.get('/posts/:username/:post_id', PostController.show) // Shows a specific post from a dev

routes.get('/dashboard', DashboardController.index) // Show all followed dev's posts

module.exports = routes
