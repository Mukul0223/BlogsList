const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specified blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  
  const contents = response.body.map(e => e.title)
  assert.strictEqual(contents.includes('React patterns'), true)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "New React Works",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)
  
  const contents = blogAtEnd.map(n => n.title)
  assert(contents.includes('New React Works'))
})



after(async () => {
  await mongoose.connection.close()
})