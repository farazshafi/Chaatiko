const express = require("express")
const dotenv = require("dotenv")
const { chats } = require("./data/data")
const connectDB = require("./config/db")
const colors = require("colors")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const { errorHandler, notFound } = require("./middleware/errorMiddleware")
const { Socket } = require("socket.io")
const path = require("path")


const app = express()
dotenv.config()
connectDB()

app.use(express.json()) //To accept json data

app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)

// production
const NODE_ENV = "production"
// development 
// const NODE_ENV = "development"


// -------------------Deployment------------
const __dirname1 = path.resolve()
if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, '/frontend/build')))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.send("Api is running in develpment mode")
    })
}
// -------------------Deployment------------

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

const server = app.listen(port, console.log(`Server started on port ${port}`.yellow.bold))

// socket connection

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        // production
        // origin: "https://chaatiko.onrender.com/"
        // development
        origin: "http://localhost:3000"

    }
})

let onlineUsers = []; // This array will store online status for users

io.on("connection", (socket) => {
    console.log("connected to socket.io")
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
        onlineUsers.push({
            userId,
            socketId:socket.id
        })
        console.log("onlineUsers : ",onlineUsers)
        io.emit("getOnlineUsers",onlineUsers)
    })
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    socket.on("newMessage", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });
    socket.on('disconnect', () => {
        const index = onlineUsers.findIndex(user => user.socketId === socket.id);
    
        if (index !== -1) {
            onlineUsers.splice(index, 1);  // Remove the user from the array
            io.emit("getOnlineUsers", onlineUsers);
            console.log("Online Users :",onlineUsers)
        }
    });
    
})