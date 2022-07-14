          
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
                           
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
                           
/* beforeAll(async () => {
  await User.deleteMany({})
  const user = {
    username: 'test',
    name: 'test user',
    password: 'password'
  }

  await api
    .post('/api/users')
    .send(user)
    .set('Accept', 'application/json')
    .expect('Content-Type', /application\/json/)
}) */


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

})

describe('when there is initially some blogs saved', () => {
 
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
                           
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
                           
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
                           
  test('unique identifier property is named id instead of _id', async () => {
    const response = await api.get('/api/blogs')   
    const id = response.body[0].id
    expect(id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  var headers
  beforeEach(async () => {
    const newUser = {
      username: 'newUser',
      name: 'New User',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('creating a new blog succeeds', async () => {

    const newBlog = {
      title: 'New Blog',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    } 

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length+1)

  })

  test('add a blog without likes property, then likes should be 0', async () => {

    const newBlog = {
      title: 'Missing likes',
      author: 'de',
      url: 'asdsdf.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
      
    expect(blogs.find(b => b.title === newBlog.title).likes).toBe(0)
  })

  test('missing title or url responds with status code 400', async () => {
    const newBlog = {
      author: 'missing url and title',
      likes: 0,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
  })

  describe('deletion of a blog', () => {
    let result
    beforeEach(async () => {
      const newBlog = {
        title: 'new blog',
        author: 'new author',
        url: 'asdf.com',
        likes: 7
      }

      result = await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
    })

    test('deleting a blog succeeds', async () => {
      const blog = result.body

      const initialBlogs = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${blog.id}`)
        .set(headers)
        .expect(204)

      const blogsAfterDelete = await helper.blogsInDb()
  
      expect(blogsAfterDelete).toHaveLength(initialBlogs.length - 1)

    })

  })
})

describe('when not logged in',  () => {
  test('a request with missing or invalid token responds with status code 401', async () => {
    const newBlog = {
      title: 'Unauthorized title',
      author: 'Unauthorized author',
      likes: 0,
      url: 'Unauthorized.com'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})




describe('editing of a blog',  () => {
  test('editing a blog succeds', async () => {
    const [ aBlog ] = await helper.blogsInDb()
  
    const editedBlog = { ...aBlog, likes: aBlog.likes + 1 }
  
    await api
      .put(`/api/blogs/${aBlog.id}`)
      .send(editedBlog)
      .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()
    const edited = blogsAtEnd.find(b => b.url === aBlog.url)
    expect(edited.likes).toBe(aBlog.likes + 1)
  })

})








afterAll(() => {
  mongoose.connection.close()
})