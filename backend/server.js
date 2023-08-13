const express = require("express")
const dotenv = require("dotenv")
const { chats } = require("./data/data")
const connectDB = require("./config/db")
const colors = require("colors")
const userRoutes = require("./routes/userRoutes")
const { errorHandler, notFound } = require("./middleware/errorMiddleware")

const app = express()
dotenv.config()
connectDB()

app.use(express.json()) //To accept json data

app.get("/", (req, res) => {
    res.send("Api is running")
})

app.use("/api/user", userRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, console.log(`Server started on port ${port}`.yellow.bold))