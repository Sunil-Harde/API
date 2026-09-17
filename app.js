const dotenv = require("dotenv")

dotenv.config()

// Packages
const mongoose = require("mongoose")
const cors = require("cors")
const rateLimiter = require("express-rate-limit")
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")



// Middleware
const { limiter } = require("./middleware/rateLimiter")
const errorMiddleware = require("./middleware/errorMiddleware")
const { auth } = require('./middleware/auth.js')



// Routes
const userRouter = require("./routes/auth.routes.js")
const productRoute = require("./routes/product.route.js")
const userProfile = require("./routes/user.routes.js")
const orderRouter = require('./routes/order.routes.js')

// Connect
const { connect } = require("./config/Connect")
connect()



// app.use(cors({
//     origin: "http://127.0.0.1:5500"
// }))



app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    method: ["post", "get", "put", "delete"]
}))


// // app.use(cors({
// //     origin:"http://localhost:5173",
// //     methods:["post"]
// // }));

app.use(express.json())
app.use(productRoute)
app.use(cookieParser())
// app.use(limiter)


app.use(rateLimiter({
    windowMs: 1000 * 10,
    max: 50,
    message: "to many request "
}))


app.use("/api/user", userRouter)

app.use(auth)
app.use("/api/user/profile", userProfile)
app.use("/api", productRoute)
app.use("/api/order", orderRouter)



app.get("/", (req, res) => {
    res.json({
        status: true,
        message: "Project_Name is running"
    })
})

app.listen(5000, console.log("server running on 5000 PORT"))