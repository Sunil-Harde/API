
const express = require("express")

const { profile } = require('../controllers/userControllers.js')

const route = express.Router()



route.get('/', profile)

module.exports = route


