

export const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body

    const nameRegex = /^[A-Za-z\s]+$/

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (!nameRegex.test(name)) {
        return res.status(400).json({
            message: "Name should contain only letters"
        })
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        })
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message:
                "Password must be 8+ chars with uppercase, lowercase, number & special character"
        })
    }
    next()
}


export const validateLogin = (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password both are required..."
        })
    }

    next()
}