const express = require("express")
const dotenv = require("dotenv")
const { chats } = require("./data/data")

const app = express()
dotenv.config()

app.get("/",(req,res)=>{
    res.send("Api is running")
})

app.get("/api/chat",(req,res)=>{
    res.send(chats)
})

app.get("/api/chat/:id",(req,res)=>{
    const chatID = req.params.id;
    const singleChat = chats.find(chat => chat._id === chatID)
    if(singleChat){
        res.send(singleChat)
    }else{
        res.status(404)
        throw new Error("Chat not found")
    }
})

const port = process.env.PORT || 5000

app.listen(port,console.log(`Server started on port ${port}`))