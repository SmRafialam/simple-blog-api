const app = require('../index'); // Adjust this to point to your Express app
require('dotenv').config(); // Load environment variables
const request = require('supertest');
const mongoose = require('mongoose');
const BlogPost = require('../models/blogPostModel');

describe('POST /posts', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await BlogPost.deleteMany(); // Clear the collection after each test
  });

  it('should create a new blog post', async () => {
    const newPost = {
      title: 'Test Title',
      content: 'Test Content',
      author: 'Test Author',
    };

    const response = await request(app).post('/posts').send(newPost);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newPost.title);
    expect(response.body.content).toBe(newPost.content);
    expect(response.body.author).toBe(newPost.author);
  });

  it('should return a 400 error if required fields are missing', async () => {
    const newPost = {
      content: 'Test Content',
      author: 'Test Author',
    };

    const response = await request(app).post('/posts').send(newPost);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Title, content, and author are required');
  });
});
