const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
const {verifyToken} = require('./middleWare')
//auth
router.get('/',verifyToken,async (req,res) =>{
  console.log(req.user)
    res.json(req.user);
})

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });  
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if(!user) return res.status(401).json("Wrong credentials!");
 
    if(user.password !== req.body.password)
      return res.status(401).json("Wrong credentials!");

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.TOKEN_SC,
      {expiresIn:"1d"}
    );
    const { password, ...others } = user._doc;

    res.status(200).json({...others, token});
  } catch (err) {
    res.status(500).json(err);
  } 
});

module.exports = router;
    