const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    f_name:{type:String, required: true,},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default:"1" },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    gold:{type:Number,default:0},
    // img: { type: String },
    address: {type: String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
