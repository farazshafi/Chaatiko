const mongoose = require("mongoose")
const colors = require("colors")

const connectDB = async () => {
    const uri = "mongodb+srv://farazpachu777:pachu@cluster0.2qgkuap.mongodb.net/ChatApp?retryWrites=true&w=majority"
    try {
        const conn = mongoose.connect(uri)
        console.log(`MongoDB Connected`.green.underline)
    } catch (error) {
        console.log(`Error : ${error.message}`.red.bold)
        process.exit(1)
    }
}

module.exports = connectDB