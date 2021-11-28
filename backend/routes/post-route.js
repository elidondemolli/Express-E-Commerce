const express = require('express');
const router = express.Router();
const { getPosts, getPostByID, createPost, updatePost, deletePost, searchPosts, getQR_Code, discountToken, discountCodes, delete_discountCodes, createOrderedItems, getOrderedItems } = require('../controllers/post-controller')
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
router.post('/order', createOrderedItems);
router.get('/orderTrack/:orderId', getOrderedItems);
router.delete('/discount-delete/:id', delete_discountCodes);
router.post('/qr/:id', getQR_Code);
router.get('/code/:code', discountCodes);
router.get('/disc/:token', discountToken);
router.get('/search/:title', searchPosts);
router.get('/:id', getPostByID);
router.patch('/:id', upload, updatePost);
router.delete('/:id', deletePost);

module.exports = router;