const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { verifyTokenAndAdmin, verifyToken } = require("./middleWare");

router.post("/place", verifyToken, async (req, res) => {
  const obj = req.body;
  let arr = [];
  let price = 0;
  Object.keys(obj).map((item, i) => {
    arr.push(
        { 
        productId: item, 
        quantity: obj[item].quantity 
    });
    price += parseFloat(obj[item].price)
  });
  if(arr == [] || price == 0) return res.status(500).json({err:'no order receive'})
  const order = new Order({
    userId: req.user.id,
    products: arr,
    price: price,
  });
  try {
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
