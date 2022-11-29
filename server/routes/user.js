const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {  verifyToken, verifyTokenAndAdmin } = require("./middleWare");

router.get("/getall", verifyTokenAndAdmin, async (req, res) => {
  const users = await User.find();
  return res.json(users);
});


module.exports = router;
