const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { verifyTokenAndAdmin, verifyToken } = require("./middleWare");

router.post("/place", verifyToken, async (req, res) => {
  const obj = req.body;
  let arr = [];
  let price = 0;
  Object.keys(obj).map((item, i) => {
    arr.push({
      productId: item,
      quantity: obj[item].quantity,
      img: obj[item].img,
      price: obj[item].price,
      title : obj[item].title,
      author: obj[item].author,
    });
    price += parseFloat(obj[item].price);
  });
  if (arr == [] || price == 0)
    return res.status(500).json({ err: "NO ORDER RECEIVE" });
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
router.get("/general", verifyToken, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  return res.json(orders);
});

router.get("/details/:orderId", verifyToken, async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  console.log(order)
  res.status(200).json(order)
});



router.get('/all',verifyTokenAndAdmin, async (req,res)=>{
  const all = await Order.find();
  res.status(200).json(all)
})


module.exports = router;
