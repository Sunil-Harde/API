
const express = require("express")

const { registerUser, login,forgotPassword,resetPassword } = require("../controllers/auth.controller.js")


const { validateRequest2 } = require("../middleware/validateRequest2.js")
const { createUserValidator } = require("../validator/userValidator.js")
const { body } = require("express-validator")
const router = express.Router()


router.post("/register", createUserValidator, validateRequest2, registerUser)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)



module.exports = router