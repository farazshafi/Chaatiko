const asyncHandler = require("express-async-handler")
const Chat = require("../models/chatModel")
const User = require("../models/userModel")
const { populate } = require("dotenv")

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        console.log("userId params not send with request")
        return req.sendStatus(400)
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name profile email"
    })

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }
        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            )
            res.status(200).send(fullChat)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})

const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updateAt: -1 })
            .then(async (result) => {
                result = await User.populate(result, {
                    path: "latestMessage.sender",
                    select: "name profile email"
                })
                res.status(200).send(result)
            })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const createGroupChat = asyncHandler(async (req, res) => {
    try {
        if (!req.body.users || !req.body.name) {
            return res.status(400).send({ message: 'Please fill all the feilds' })
        }

        var users = JSON.parse(req.body.users);

        if (users.length < 2) {
            res.status(400)
            throw new Error("More than 2 users are required to form Group Chat")
        }
        users.push(req.user)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
        res.status(200).json(fullGroupChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body
    const updatedChat = await Chat.findByIdAndUpdate(chatId, {
        chatName
    },
        {
            new: true
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
    if (!updatedChat) {
        res.status(404)
        throw new Error("Chat Not Found")
    } else {
        res.json(updatedChat)
    }
})

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body
    const addedUserToGroup = await Chat.findByIdAndUpdate(chatId, {
        $push: { users: userId },
    }, { new: true })
    .populate("users","-password")
    .populate("groupAdmin","-password")
    if(!addedUserToGroup){
        res.status(400)
        throw new Error("User Not Added")
    }else{
        res.json(addedUserToGroup)
    }
})

const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body
    const removeUserFromGroup = await Chat.findByIdAndUpdate(chatId, {
        $pull: { users: userId },
    }, { new: true })
    .populate("users","-password")
    .populate("groupAdmin","-password")
    if(!removeUserFromGroup){
        res.status(400)
        throw new Error("User didin't Removed!")
    }else{
        res.json(removeUserFromGroup)
    }
})

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup }