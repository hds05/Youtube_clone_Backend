import mongoose from 'mongoose'

const MongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB is connected successfully..😁")
    }
    catch (err) {
        console.log("Error in connecting DB", err.message)
        process.exit(1)
    }
}
export default MongoDB