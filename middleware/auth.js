const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {


    try {

        // const bearerToken = req.headers.authorization


        // if (!bearerToken || !bearerToken.startsWith('Bearer ')) {

        //     return res.status(404).json({

        //         success: false,
        //         message: "Token not valid"
        //     })

        // }

        // const token = bearerToken.split(' ')[1]

        // if (!token) {
        //     return res.json({
        //         success: false,
        //         message: "invalid token format"
        //     })
        // }

        // const verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        // console.log(verifyToken);
        // req.user = verifyToken


        next()

    }


    catch (err) {

        // console.log(err);

        if (err.name === "TokenExpiredError") {

            return res.status(404).json({
                success: false,
                message: "login expired pls login again"
            })


        }

        res.status(404).json({
            success: false,
            message: "internal server error"
        })

    }



}



module.exports = { auth }