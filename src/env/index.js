const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'root',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'root',
  PORT: process.env.PORT || 5000,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
  AUTH_TOKEN_TTL: process.env.AUTH_TOKEN_TTL || '1h'
}
