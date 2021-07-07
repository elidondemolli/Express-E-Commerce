const Post = require('../models/post');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

const getPostByID = async (req, res) => {
    try {
        const postByID = await Post.findById(req.params.id);
        return res.status(200).json(postByID);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

const createPost = async (req, res) => {
    const post = req.body;
    const imageName = req.file.filename;
    post.image = imageName;
    
    try {
        await Post.create(post);
        res.status(201).json({ message: 'Post created successfully!'});
    } catch (error) {
        res.status(404).json({ messag: error });
    }
}

const updatePost = async (req, res) => {
    res.send('UPDATE POST');
}

const deletePost = async (req, res) => {
    res.send('DELETE POST');
}

module.exports = { getPosts, getPostByID, createPost, updatePost, deletePost }