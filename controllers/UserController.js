import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required..." })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists..." });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, email, password: hashPassword
        })

        res.status(200).json(user)

    }
    catch (err) {
        console.log(`The Error for register: ${err}`)
        res.status(500).json({ message: "Server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(401).json({ message: "All fields are required..." })
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_secret,
                { expiresIn: "1h" }
            )
            res.json({ token })
        }
        else {
            res.status(401).json({ message: "Invalid Credentials..." })
        }
    }
    catch (err) {
        console.log("The Error for login:", err.message);
        res.status(500).json({ message: "Server Error" })
    }
}