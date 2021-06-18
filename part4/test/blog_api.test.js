const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})

  const testUser = {
    username: 'Eldon',
    password: '123',
    name: 'Eldon Lin',
  }

  await api.post('/api/users').send(testUser)

  const loginResponse = await api
    .post('/api/login')
    .send({ username: testUser.username, password: testUser.password })

  token = 'Bearer ' + loginResponse.body.token
})

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

test('http unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'great book',
    author: 'Yujun Lin',
    url: '123',
    likes: 100,
  }
  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((blog) => blog.title)
  expect(titles).toContain(newBlog.title)
})

test('a blog without likes property can be added', async () => {
  const newBlog = {
    title: 'great book',
    author: 'Yujun Lin',
    url: '123',
  }
  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((blog) => blog.title)
  expect(titles).toContain(newBlog.title)
})

test('a blog without title or url probably would return 400', async () => {
  const newBlog = {
    title: 'great book',
    author: 'Yujun Lin',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400)

  const newBlog2 = {
    author: 'Yujun Lin',
    url: '',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog2)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
