const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const Order = require("../models/Order")
const {  verifyToken, verifyTokenAndAdmin } = require("./middleWare");

router.get("/", async (req, res) => {
  const Blogs = await Blog.find({status:'verified'});
  console.log(Blogs)
  return res.json(Blogs);
});
router.get("/:id", async (req, res) => {
  const Blogs = await Blog.find({_id : req.params.id});
  console.log(Blogs)
  return res.json(Blogs);
});

router.get("/confirm/:blogId", verifyTokenAndAdmin, async (req, res) => {
  const blog = await Blog.findById(req.params.blogId);
  if (blog?.status != "pending"){
    return res.status(500).json("Already evaluated");
  }
    const newBlog = await Blog.updateOne({_id:req.params.blogId},{status:'verified'})
  res.status(200).json(newBlog);
});

router.get("/all", verifyTokenAndAdmin, async (req, res) => {
  try{
    const all = await Blog.find( );
    res.status(200).json(all);
  }
  catch(err){
    res.json(err)
  }
  
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
