const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./middleWare");

router.get("/", async (req, res) => {
  const listOfProduct = await Product.find();
  res.status(200).json(listOfProduct);
});
router.post("/import", async (req, res) => {
  try {
    await Product.insertMany(req.body, { ordered: true });
    res.status(200).json(req.body);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product({
    title: item.title,
    desc: item.desc,
    author: req.body.author,
    img: req.body.img,
    categories: req.body.categories,
    price: req.body.price,
  });
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
