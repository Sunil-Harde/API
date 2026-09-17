const Product = require("../model/Product")

const createProduct = async (req, res, next) => {

    try {

        const { name, price, category, stock } = req.body

        const product = await Product.create({
            name,
            price,
            category,
            stock
        })



        res.status(201).json({
            status: true,
            message: "product created successfully",
            data: product
        })


    }


    catch (err) {
        next(err)

    }

}


const getAllProducts = async (req, res, next) => {

    try {

        console.log(req.query.pages)
        console.log(req.query.limit)

        let { page, limit, search, category, minPrice, maxPrice, sort } = req.query


        page = Number(page) || 1
        limit = Number(limit) || 10


        const skip = (page - 1) * limit;


        const filter = {}

        if (search) {
            filter.name = {
                $regex: search,
                $options: 'i'
            }
        }

        console.log(filter)

        if (category) {
            filter.category = category
        }

        if (minPrice || maxPrice) {

            filter.price = {}

            if (minPrice) {
                filter.price.$gte = Number(minPrice)
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice)
            }

        }


        const getProduct = await Product.find(filter).skip(skip).limit(limit)
        const totalProducts = await Product.countDocuments(filter);


        res.status(200).json({
            status: true,
            message: "products fetch successfully ",
            totalPages: Math.ceil(totalProducts / limit),
            total: totalProducts,
            productsOnCurrentPage: getProduct.length,
            limit: limit,
            currentPage: page,
            data: getProduct
        })

    }

    catch (err) {
        next(err)
    }

}


const getProducts = async (req, res, next) => {

    try {

        const { id } = req.params

        if (!id) {

            return res.status(400).json({
                status: false,
                message: "something wring  ",
            })
        }



        const getProduct = await Product.findById(id)


        if (!getProduct) {

            return res.status(404).json({
                status: false,
                message: "product not found ",
            })
        }
        
        res.json({
            status: true,
            message: "all products ",
            data: getProduct
        })

    }

    catch (err) {
        next(err)
    }

}


const deleteProducts = async (req, res, next) => {

    try {
        const { id } = req.params


        if (!id) {
            return res.status(404).json({
                status: false,
                message: "id not found",
            })

        }

        console.log(id)

        const deleteProduct = await Product.findByIdAndDelete(id)

        if (!deleteProduct) {

            return res.status(404).json({
                status: false,
                message: "product not exist ",
            })
        }

        res.json({
            status: true,
            message: "delete successfully products ",
            data: deleteProduct
        })

    }

    catch (err) {
        next(err)
    }

}


module.exports = { createProduct, getAllProducts, deleteProducts, getProducts }