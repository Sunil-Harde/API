const { body } = require("express-validator")


console.log("user validator")

const createUserValidator = [

    body("name")
        .notEmpty().withMessage("name is require")
        .trim(),

    body("number")
        .notEmpty().withMessage("name is require")
        .trim()
        .isInt().withMessage("number require")
        .isLength({ min: 10, max: 10 }).withMessage("only 10 number require"),

    body("email")
        .notEmpty().withMessage("mail is require")
        .trim()
        .bail()
        .isLowercase()
        .isEmail().withMessage("is it not mail"),

    body("password")
        .notEmpty().withMessage("mail is require")
        .trim()
        .bail()
        .isStrongPassword().withMessage("@ W number")
        .bail()

]

module.exports = { createUserValidator }