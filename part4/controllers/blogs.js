const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  if (!blog.title || !blog.url) {
    return response.status(400).end()
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
  const user = req.user

  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== user.id) {
    // eslint-disable-next-line quotes
    return res.status(401).json({ error: "can not delete other's blog" })
  }
  const removedBlog = await Blog.findByIdAndRemove(req.params.id)

  user.blogs = user.blogs.filter((blog) => blog.toString() !== removedBlog.id)
  await user.save()

  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    likes: body.likes,
  }

  const updatedBlogs = await Blog.findByIdAndUpdate(req.params.id, blog)
  res.status(200).json(updatedBlogs)
})

module.exports = blogRouter
