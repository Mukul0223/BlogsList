const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Get all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    res.json(blogs)
})

// Create blog
blogsRouter.post('/', async (req, res) => {
  const body = req.body
  
  const blog = new Blog(body)
  
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

module.exports = blogsRouter
