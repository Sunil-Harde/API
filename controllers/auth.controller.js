const User = require("../model/UserModel")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const { sendEmail } = require("../utils/sendEmail.js")

const { validationResult } = require("express-validator")




// npm i bcryptjs
// npm i jsonwebtoken


const registerUser = async (req, res, next) => {


    const validation = validationResult(req)

    if (!validation.isEmpty()) {
        res.json({
            status: false,
            message: validation.array()
        })
    }

    try {

        const { email, name, number, password } = req.body

        const duplicateEmail = await User.findOne({ email })
        const duplicateUserName = await User.findOne({ name })

        if (duplicateEmail || duplicateUserName) {
            return res.json({
                success: false,
                message: " email or User Name already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)


        const user = await User.create({
            email,
            name,
            password: hashPassword,
            number
        })


        res.json({
            success: true,
            message: "user created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,

            }
            
        })


    }

    
    catch (err) {

        next(err)
    }


}



const login = async (req, res, next) => {

    try {



        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.json({
                success: false,
                message: "user not present"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)


        if (!isMatch) {
            return res.json({
                success: false,
                message: "incorrect Password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )




        res.json({
            success: true,
            message: "user login successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,

            }
        })

    }

    catch (err) {

        next(err)

    }


}



const forgotPassword = async (req, res, next) => {

    try {

        const { email } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user Not found"
            })
        }

        const resetToken = crypto.randomBytes(32).toString('hex')

        user.resetPasswordToken = crypto.createHash()
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000

        await user.save()

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;


        const message = `
        
        click below link to reset password

        ${resetUrl}

        this link will expire in 15 minutes
        `

        await sendEmail({
            email: "sunilharde18@gmail.com",
            subject: "reset Password",
            message
        })


        res.status(200).json({

            success: true,

            message: 'Password reset link generated',

            resetUrl

        });

    }

    catch (err) {

        next(err)


    }
}



const resetPassword = async (req, res, next) => {

    try {

        const { token } = req.params
        const { password } = req.body

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        })


        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'invalid or expired reset token'
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });


    }

    catch (err) {
        next(err)
    }


}


module.exports = { login, registerUser, forgotPassword, resetPassword }