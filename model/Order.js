const mongoose = require("mongoose")



const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        require: true
    },

    product: String,
    category: String,
    amount: Number,

    quantity: {
        type: Number,
        default: 1
    }

}, { timestamps: true })


const Order = mongoose.model('Order', orderSchema)


module.exports = { Order } 