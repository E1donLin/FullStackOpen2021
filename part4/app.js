const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const mongoUrl = config.MONGODB_URI

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((err) => {
    logger.error('error connection to MongoDB', err.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
