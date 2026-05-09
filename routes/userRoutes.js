// importing express package
import express from "express";
// inporting User controllers
import { loginUser, registerUser } from "../controllers/UserController.js";
// importing validation middleware
import {
  validateLogin,
  validateRegister,
} from "../middleware/validationMiddleware.js";

// creating express router instance
const router = express.Router();

// route to post register credentials with validateRegister middleware to check validation
router.post("/register", validateRegister, registerUser);
// route to post login credentials with validateLogin middleware to check validation
router.post("/login", validateLogin, loginUser);

// exporting router
export default router;
