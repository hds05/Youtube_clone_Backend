// middleware to validate register form data
export const validateRegister = (req, res, next) => {
  // extracting user data from request body
  const { name, email, password } = req.body;

  // regex to allow only alphabets and spaces in name
  const nameRegex = /^[A-Za-z\s]+$/;
  // regex to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // validating name
  if (!nameRegex.test(name)) {
    return res.status(400).json({
      message: "Name should contain only letters",
    });
  }
  // validating email
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }
  // validating pasword
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be 8+ chars with uppercase, lowercase, number & special character",
    });
  }
  // move to next middleware/controller if validation passes
  next();
};

// middleware to validate login data
export const validateLogin = (req, res, next) => {
  // extracting login credentials
  const { email, password } = req.body;
  // checking if email or password is missing
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password both are required...",
    });
  }
  // move to next middleware/controller
  next();
};
