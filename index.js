const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')


const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
/* const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')

const Blog = require('./models/blog')


app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
}) 
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
}) */