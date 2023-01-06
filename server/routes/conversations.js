const router = require("express").Router();
const Conversation = require("../models/Conversation");
const { verifyToken, verifyTokenAndAdmin } = require("./middleWare");

//new conv
router.get("/",verifyToken, async (req, res) => {

    // return res.status(500).json('Existed conversation')
  const newConversation = new Conversation({
    members: req.user.id,
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: req.params.userId ,
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
    console.log('sdad')
  }
});
router.post("/",verifyTokenAndAdmin, async (req, res) => {
  try {
    const conversation = await Conversation.find()
    console.log(conversation)
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});


// get conv includes two userId



module.exports = router;
