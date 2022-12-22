const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 4);

const BlogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    author:{type:String,required:true},
    status: { type: String, default: "pending"},
    content: {type:String,required:true},
    title:{type:String,required:true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
