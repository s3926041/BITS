const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 4);

const SicboSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    condition:{type:String,required:true},
    gold: {type:Float,required:true},
    dice1:{type:Number,required:true},
    dice2:{type:Number,required:true},
    dice3:{type:Number,required:true},
    result: { type: Number, required:true},
    // title:{type:String,required:true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sicbo", SicboSchema);
