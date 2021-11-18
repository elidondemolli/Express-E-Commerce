const express = require('express');
const router = express.Router();
const { getPosts, getPostByID, createPost, updatePost, deletePost, searchPosts, getQR_Code, getDiscount } = require('../controllers/post-controller')
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
router.post('/', upload, createPost);
router.get('/qr/:id', getQR_Code);
router.put('/discount/:id', getDiscount);
router.get('/search/:title', searchPosts);
router.get('/:id', getPostByID);
router.patch('/:id', upload, updatePost);
router.delete('/:id', deletePost);

module.exports = router;