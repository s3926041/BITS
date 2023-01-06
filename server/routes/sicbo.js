const router = require("express").Router();
const Sicbo = require("../models/Sicbo");
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { verifyToken, verifyTokenAndAdmin } = require("./middleWare");
//auth
router.post("/", verifyToken, async (req, res) => {
  // console.log('sd')
  const condition = req.body.condition;
  const gold = req.body.gold;
  if (gold > req.user.gold || !gold || !condition || gold === "0") {
    return res.status(500).json({message:"exceeded amount of gold"});
  }
  let rand = Math.floor(Math.random() * 10) + 1;
//   const result = rand > 4 ? true : false;
  let dice1,
    dice2 ,
    dice3 ,
    temp;
  temp = 0;
  dice1 = Math.floor(Math.random() * 6) + 1;
  dice2 = Math.floor(Math.random() * 6) + 1;
  dice3 = Math.floor(Math.random() * 6) + 1;
  temp = dice1 + dice2 + dice3;
  const data = {
    userId: req.user._id,
    condition: req.body.condition,
    result: temp,
    gold: req.body.gold,
    dice1: dice1,
    dice2: dice2,
    dice3: dice3,
  };
  const newSic = new Sicbo(data);
  let calcRes = temp >11 ? 'high' : 'low'
  let calcGold = calcRes == condition ? parseInt(gold) : parseInt(-gold)
  await User.updateOne({_id:req.user._id},{gold:parseInt(req.user.gold) +parseInt(calcGold)})
  const sic = await newSic.save()
  console.log(sic)
  res.status(200).json(data);
});

router.get('/all',verifyTokenAndAdmin, async(req,res)=>{
    const sic = await Sicbo.find()
    res.status(200).json(sic)
})

router.get('/',verifyToken,async (req,res)=>{
  const sic = await Sicbo.find({userId:req.user._id})
  res.status(200).json(sic)
})
module.exports = router;
