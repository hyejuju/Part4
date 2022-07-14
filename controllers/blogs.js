
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
//const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
 
  const blogs = await Blog
    .find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  //const token = getTokenFrom(request)
  if(!request.token){
    return response.status(401).json({ error: 'token missing' })
  }
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  //const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user,
    likes: body.likes
  })
  
  if(!blog.likes) {
    blog.likes = 0
  }

  if (!blog.title || !blog.url)
    return response.status(400).json({ error: 'title or url missing' })


  /* blog
    .save()
    .then(result => {
      response.status(201).json(result)
    }) */
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
  
}) 

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  //const user = await User.findById(decodedToken.id)
  const user = request.user

  if (!blog) {
    return response.status(401).json({ error: 'blog not found' })
  }

  if(!user){
    return response.status(401).json({ error: 'user not found' })
  }

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else{
    return response.status(401).json({ error: 'userid check gone wrong' })
  } 
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(updatedBlog.toJSON())
})


module.exports = blogsRouter