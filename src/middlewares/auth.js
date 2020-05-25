const jwt = require('jsonwebtoken')
const { secret } = require('../../config')

const checkToken = (req, res, next) => {
  const authorization = req.headers['x-access-token'] || req.headers.authorization // Express headers are auto converted to lowercase

  if (!authorization) {
    return res.status(400).send('Authorization header is required')
  }

  const [authType, base64Encoded] = authorization.split(' ')
  if (!authType === 'Bearer' || !base64Encoded) {
    return res.status(401).send('Invalid credentials')
  }

  next()
}

const verifyJWT = (req, res, next) => {
  const authorization = req.headers['x-access-token'] || req.headers.authorization

  const [, base64Encoded] = authorization.split(' ')

  const token = Buffer.from(base64Encoded, 'base64').toString('utf8')

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send('Token expired')
      } else {
        return res.status(401).send('Invalid credentials')
      }
    } else {
      const {
        sub: id,
        context: {
          github_username: githubUsername,
          name,
          bio
        }
      } = decoded
      res.locals.user = {
        id,
        github_username: githubUsername,
        name,
        bio
      }
    }
  })
  next()
}

module.exports = {
  checkToken,
  verifyJWT
}
