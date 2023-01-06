const router = require("express").Router();
const Comment = require("../models/Comment");
const { verifyToken } = require("./middleWare");

//add

router.post("/create", verifyToken, async (req, res) => {
  if (req.body.content == "") return res.status(500).json("err");
  const data = {
    username:req.user.username,
    userId: req.user._id,
    id: req.body.id,
    content: req.body.content,
  };
  const newComment = new Comment(data);

  try {
    const savedComment = await newComment.save();
    console.log(savedComment);
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const Comments = await Comment.find({
      id: req.params.id,
    });
    res.status(200).json(Comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
