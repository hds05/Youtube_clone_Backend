// importing mongoose package
import mongoose from "mongoose";

// creating schema for users collection
const userSchema = new mongoose.Schema({
    // user's name
    name: {
        type: String,
        required: true
    },
    // user's email
    email: {
        type: String,
        required: true
    },
    // user's password
    password: {
        type: String,
        required: true
    }
})
// Creating User model using schema
const User = mongoose.model("User", userSchema)
// exporting User Model
export default User;