const express = require("express");
const Post = require('../models/post'); 
const router = express.Router();

router

  .post('/createpost', async (req, res) => {
    try {
      const post = await Post.create(req.body.postname,req.body.userid, req.body.postcontent);
      res.send({...post, userid: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .put('/updatepost', async (req, res) => {
    try {
      const post = await Post.updatePost(req.body.id, req.body.postname, req.body.postcontent);
      res.send({...post, userid: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/deletepost', async (req, res) => {
    try {
      await Post.deletePost(req.body.id);
      res.send({ success: "The post has been deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })
  .post('/getPost', async (req, res) => {
    try {
        const post = await Post.getPost(req.body.id);
        res.send({...post, userid: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

module.exports = router;