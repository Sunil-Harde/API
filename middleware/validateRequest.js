const { validationResult } = require("express-validator")

exports.validateRequest = (req,res,next) =>{

    const errors = validationResult(res)

    console.log(errors.array())

    if(!errors.isEmpty()){
        return req.status(400).json({

            success:false,
            errors: errors.array()

        })
    }

    next()
}


