const express = require('express');
const router = express.Router();
const { getPosts, getPostByID, createPost, updatePost, deletePost } = require('../controllers/post-controller')
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
});

let upload = multer({
    storage: storage
}).single('image');


router.get('/', getPosts);
router.get('/:id', getPostByID);
router.post('/', upload, createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;