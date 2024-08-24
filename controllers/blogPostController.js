const blogPost = require('../models/blogPostModel');

exports.getAllPost = async (req,res) => {
    try{
        const posts = await blogPost.find();
        console.log(posts);
        res.json(posts);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Error fetching posts' });
    }
}

exports.createPost = async (req,res) => {
    console.log(req.body);
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
        return res.status(400).json({ error: 'Title, content, and author are required' });
      }
    try{
        const newPost = new blogPost({ title,content,author });
        const savedPost = await newPost.save();
        console.log(savedPost);
        res.status(201).json(savedPost);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Error creating posts' });
    }
}

exports.getPostById = async (req,res) => {
    try {
      const id = req.params.id;
      const postById = await blogPost.findById(id);
      if (!postById) return res.status(404).json({ error: 'Post not found' });
      res.json(postById);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching post' });
    }
};

exports.updatePost = async (req,res) => {
    const { title, content, author } = req.body;
    
    try{
        const id = req.params.id;
        const updatedPost = await blogPost.findByIdAndUpdate(id, { title, content, author }, { new: true });
        console.log(updatedPost);
        if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
        res.json(updatedPost);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Error updating posts' });
    }
}

exports.deletePost = async (req,res) => {
    try{
        const id = req.params.id;
        const deletedPost = await blogPost.findByIdAndDelete(id);
        console.log(deletedPost);
        if (!deletedPost) return res.status(404).json({ error: 'Post not found' });
        res.status(204).end();
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Error deleting posts' });
    }
}