const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose, 2);
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    author:{type: String, required: true},
    img: { type: String, required: true },
    categories: { type: String },
    price: { type: Float, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
