const Post = require('../models/post');
const fs = require('fs');
const QR_CODE = require('qrcode');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

const getQR_Code = async (req, res) => {
    try {
        const qr = await QR_CODE.toDataURL(`http://192.168.1.136:8081/discount/${req.params.id}`);
        console.log('qrqrqrrq', qr);
        return res.status(200).json(qr);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

const getDiscount = async (req, res) => {
    try {
        const discount_product = req.params.id;
        const posts = await Post.updateOne({ _id: discount_product}, { $set: { discount_price: Math.floor(Math.random() * 15), discount_code: req.body.code }}, { upsert: true });
        if(posts) {
            return res.status(200).json(posts);
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error });
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
    console.log(post)
    console.log(req.file)
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

const searchPosts = async (req, res) => {
    try {
        const search = await Post.find({ title: new RegExp(req.params.title, 'i')});
        res.status(200).json(search);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

module.exports = { getPosts, getPostByID, createPost, updatePost, deletePost, searchPosts, getQR_Code, getDiscount }