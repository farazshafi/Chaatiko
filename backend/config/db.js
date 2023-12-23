const mongoose = require("mongoose")
const colors = require("colors")

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected`.green.underline)
    } catch (error) {
        console.log(`Error : ${error.message}`.red.bold)
        process.exit(1)
    }
}

module.exports = connectDB