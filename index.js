require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');
const cors = require('cors');
const connectDB = require('./config/db');
// const blogPostRoutes = require('./routes/posts');
const port = process.env.port;

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// ... API routes
// app.get('/post', (req,res)=>{
//     res.send('Hello World');
// })
app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});