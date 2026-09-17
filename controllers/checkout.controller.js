const mongoose = require('mongoose');
const Product = require('../model/Product');
const Order = require('../model/Order');
const Payment = require('../model/Payment');


exports.checkout = async (req, res) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const { productId, quantity } = req.body;

        // Find product
        const product = await Product.findById(productId).session(session);

        if (!product) {
            throw new Error('Product not found');
        }

        if (product.stock < quantity) {
            throw new Error('Insufficient stock');
        }

        const amount = product.price * quantity;

        // 1. Create payment
        const payment = await Payment.create([{
            amount,
            status: 'success'
        }], { session });

        // 2. Create order
        const order = await Order.create([{
            productId,
            quantity,
            totalAmount: amount
        }], { session });

        // 3. Update stock
        product.stock -= quantity;
        await product.save({ session });

        // Commit all changes
        await session.commitTransaction();

        session.endSession();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            payment: payment[0],
            order: order[0]
        });

    } catch (error) {

        // Rollback all changes
        await session.abortTransaction();

        session.endSession();

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};
 