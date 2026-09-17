const express = require('express')

const router = express.Router()

const {createOrder, getOrders} = require('../controllers/order.controller.js')


router.post('/',createOrder)
router.get('/',getOrders)

module.exports = router