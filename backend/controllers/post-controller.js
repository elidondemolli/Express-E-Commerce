const Post = require('../models/post');
const fs = require('fs')

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
        let new_image = '';
        if(req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync("uploads/" + req.body.old_image);
            } catch (error) {
                console.log(error);
            }
        } else {
            new_image = req.body.old_image;
        }

        const newPost = req.body;
        newPost.image = new_image;

        try {
            const updated = await Post.findByIdAndUpdate(req.params.id, newPost);
            res.status(200).json({ message: 'Post Updated Successfully!'})
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
}

const deletePost = async (req, res) => {
    try {
        const result = await Post.findByIdAndDelete(req.params.id)
        if(result.image != ''){
            try {
                fs.unlinkSync("uploads/"+ result.image);
            } catch (error) {
                console.log(error);     
            }
        }
        res.status(200).json({ message: 'Post Deleted Successfully!'});
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

module.exports = { getPosts, getPostByID, createPost, updatePost, deletePost }