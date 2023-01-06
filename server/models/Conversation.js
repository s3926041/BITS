const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
const Conversation = mongoose.model("Conversation", ConversationSchema);
Conversation.createIndexes()
module.exports = Conversation 
