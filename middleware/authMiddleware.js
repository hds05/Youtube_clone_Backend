// importing jsonwebtoken package
import jwt from 'jsonwebtoken'

// middleware to protect private routes
export const protect = async (req, res, next) => {
    // extracting token from authorization header
    const token = req.headers.authorization?.split(" ")[1]

    // checking if token exists
    if (!token) { return res.status(401).json({ message: "Not authorized" }) }


    try {
        // verifying token using secret key
        const decoded = jwt.verify(token, process.env.JWT_secret)
        // storing decoded user data inside req.user so next middleware/controllers can access logged in user
        req.user = decoded
        // moving to next middleware/controller
        next()
    }
    catch (err) {
        // if token is invalid or expired
        res.status(401).json({ message: "Token is invalid or expired"});
    }
}