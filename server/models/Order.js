const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose, 4);

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    price: {type: Float},
    address: { type: String, default:"ha noi" },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);