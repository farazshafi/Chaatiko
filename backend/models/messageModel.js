const mongoose = require("mongoose")

const messageModel = mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    message:{type:String, trim:true},
    chat:{type:String, trim:true}
},{timestamps:true})

const Message = mongoose.model("Message", messageModel)
module.exports = Message;