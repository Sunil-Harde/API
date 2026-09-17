

const { Order } = require('../model/Order.js')

const getOrders = async (req, res, next) => {

    try {


        const orders = await Order.find()
            .populate('userId', 'name email number')
            .populate('productId');

        res.status(200).json({
            success: true,
            orders
        })

    }

    catch (err) {
        next(err)
    }


}


const createOrder = async (req, res, next) => {

    try {

        const { userId, productId, quantity } = req.body;

        const order = await Order.create({
            userId,
            productId,
            quantity
        })

        res.status(201).json({
            success: true,
            order
        })

    }


    catch (err) {
        next(err)
    }

}


module.exports = { createOrder, getOrders }