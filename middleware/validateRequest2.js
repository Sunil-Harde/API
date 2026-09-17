const { validationResult } = require("express-validator")


const validateRequest2 = (req, res, next) => {


    const validation = validationResult(req)

    if (!validation.isEmpty()) {
        return res.json({
            status: false,
            message: validation.array()
        })
    }

    next()


}

module.exports = { validateRequest2 }
