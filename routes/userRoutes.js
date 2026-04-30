import express from 'express'
import { loginUser, registerUser } from '../controllers/UserController.js'
import { validateLogin, validateRegister } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.post('/register',validateRegister ,registerUser)
router.post('/login',validateLogin , loginUser)

export default router;