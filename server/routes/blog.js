const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const {  verifyToken, verifyTokenAndAdmin } = require("./middleWare");

router.get("/", async (req, res) => {
  const Blogs = await Blog.find();
  console.log(Blogs)
  return res.json(Blogs);
});

router.post("/create", verifyToken, async (req, res) => {
    // console.log(req.user.id)
    const newBlog = new Blog({
        userId: req.user.id,
        author: req.body.author,
        content: req.body.content,
        title:req.body.title
    });
    try {
      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
    } catch (err) {
      res.status(500).json(err.message);
      console.log(err.message)
    }
  });
module.exports = router;
