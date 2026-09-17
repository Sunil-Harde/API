const rateLimit = require("express-rate-limit")

exports.limiter = rateLimit({

    windowMs: 60 * 100,
    max: 200,
    message: "too Many Request"

})


exports.userLimiter = rateLimit({
    windowMs: 1000 * 60,
    max: 500,
    message: "TO many request pls try some tme later"
})

// module.exports = {limiter}