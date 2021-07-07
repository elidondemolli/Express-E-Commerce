const express = require('express');
const router = express.Router();
const { getPosts, getPostByID, createPost, updatePost, deletePost } = require('../controllers/post-controller')

router.get('/', getPosts);
router.get('/:id', getPostByID);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;