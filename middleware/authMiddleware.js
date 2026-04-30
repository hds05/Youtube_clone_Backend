import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) { return res.status(401).json({ message: "Not authorized" }) }

    try {
        const decoded = jwt.verify(token, process.env.JWT_secret)
        req.user = decoded
        next()
    }
    catch (err) {
        res.status(401).json({ message: "Token is invalid or expired"});
    }
}