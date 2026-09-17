const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({

    name: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    stock: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})


const Product = mongoose.model("products", productSchema)


module.exports = Product