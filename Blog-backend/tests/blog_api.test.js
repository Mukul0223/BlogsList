const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
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
  
  describe('vewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]
      
      console.log('blogToView', blogToView)
      
      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      console.log(resultBlog.body)
      
      assert.deepStrictEqual(resultBlog.body, blogToView)
    })
    
    test('fails with statuscode 404 if note does not exit', async () => {
      const validNonexistingId = await helper.nonExistingId()
      
      await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
    })
    
    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '535590700815'
      
      await api.get(`/api/blogs/${invalidId}`).expect(400)
    })
  })
  
  describe('addition of a new blog', () => {
    test('success with a vlid data', async () => {
      const newBlog = {
        title: "New React Works",
        author: "Michael J Chan",
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
    
    test('fails with status code 400 if data invalid', async () => {
      const newBlog = {
        url: "https://reactpatterns.com/"
      }
      await api.post('/api/blogs').send(newBlog).expect(400)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })
  
  describe.only('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      
      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
      
      const blogsAtEnd = await helper.blogsInDb()
      
      const ids = blogsAtEnd.map(n => n.id)
      assert(!ids.includes(blogToDelete.id))
      
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })
})


after(async () => {
  await mongoose.connection.close()
})