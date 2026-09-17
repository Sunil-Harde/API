const Order = require('../model/Order')

const totalSales = async (req, res) => {

    const result = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: '$amount' },
                totalOrders: { $sum: 1 },
                averageOrder: { $avg: '$amount' }
            }
        }
    ])


    console.log(result);


    res.json(result[0]);


}