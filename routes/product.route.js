
const { createProduct, getAllProducts, deleteProducts, getProducts } = require("../controllers/product.controller")
const { body } = require("express-validator")

const rateLimiter = require("express-rate-limit")
const express = require("express")
const route = express.Router()

const { validateRequest2 } = require("../middleware/validateRequest2")

const validation = [

    body("name")
        .notEmpty().withMessage("name is require")
        .bail()
        .isLength({ min: 4, max: 10 }).withMessage("min char 4 and max char 10")
        .trim(),


    body("price")
        .notEmpty().withMessage("name is require")
        .trim()
        .isInt().withMessage("number require")

]


// const postRatelimit = route.use(rateLimiter({
//     windowMs: 1000 * 10,
//     max: 100,
//     message: "to many request "
// }))




route.post("/product", validation, validateRequest2, createProduct)
route.get("/product", getAllProducts)
route.delete("/product/:id", deleteProducts)
route.get("/product/:id", getProducts)


module.exports = route

