// importing mongoose package to interact with MongoDB
import mongoose from 'mongoose'

// function to connect server with MongoDB database
const MongoDB = async () => {
    try {
        // connecting to MongoDB using connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI)
        // success message after successful DB connection
        console.log("DB is connected successfully..😁")
    }
    catch (err) {
        // logging error message if connection fails
        console.log("Error in connecting DB", err.message)
        // stopping server if database connection fails
        process.exit(1)
    }
}
// exporting MongoDB connection function
export default MongoDB