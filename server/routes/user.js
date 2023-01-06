const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {  verifyToken, verifyTokenAndAdmin } = require("./middleWare");

router.get("/getall", verifyTokenAndAdmin, async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

router.get('/find/:id',verifyTokenAndAdmin,async(req,res)=>{
  const user = await User.findById(req.params.id)
  console.log(user)
  res.status(200).json(user)
})
module.exports = router;
