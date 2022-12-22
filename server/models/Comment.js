const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 4);

const CommentSchema = new mongoose.Schema(
  {
    blogId: { type: String, required: true },
    content: { type: String, required:true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
