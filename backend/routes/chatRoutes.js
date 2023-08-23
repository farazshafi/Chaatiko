const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup
} = require("../controllers/chatController")
const router = express.Router()

router.post("/", protect, accessChat)
router.get("/", protect, fetchChats)

router.route("/group")
    .post(protect, createGroupChat)

router.route("/rename")
    .put(protect, renameGroup)

router.route("/addToGroup")
    .put(protect, addToGroup)

router.route("/removeFromGroup")
    .put(protect, removeFromGroup)
module.exports = router