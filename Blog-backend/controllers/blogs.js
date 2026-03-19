const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Get all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    res.json(blogs)
})

// Get blog by id
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  }
  else {
    res.status(404).end()
  }
})

// Create blog
blogsRouter.post('/', async (req, res) => {
  const body = req.body
  
  const blog = new Blog(body)
  
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

// Delete blog
blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

// Update blog
blogsRouter.put('/:id', (req, res, next) => {
  const { author, title, url, likes } = req.body
  Blog.findById(req.params.id).then(blog => {
    if (!blog) {
      return res.status(400).end()
    }
    blog.author = author
    blog.title = title
    blog.url = url
    blog.likes = likes
    return blog.save().then(updatedBlog => {
      res.json(updatedBlog)
    })
  })
  .catch(error => next(error))
})

module.exports = blogsRouter
