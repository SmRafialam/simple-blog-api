const express = require('express');
const router = express();
const postController = require('../controllers/blogPostController');

// router.get('/',(req,res)=>{
//     res.send('In posts')
// })

router.get('/',postController.getAllPost);
router.post('',postController.createPost);
router.get('/:id',postController.getPostById);
router.put('/:id',postController.updatePost);
router.delete('/:id',postController.deletePost);

module.exports = router;