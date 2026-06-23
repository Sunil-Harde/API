const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors");
const app = express()



mongoose.connect("mongodb+srv://sunilharde10_db_user:68FQvqbwA0Rlz4X7@app.uz9ggtm.mongodb.net/test?appName=App")
    .then(() => console.log("database is connected"))
    .catch((err) => console.log(err))

// async function connectDB(params) {

//     try {

//         let connect = await mongoose.connect("mongodb://localhost:27017")

//     }

//     catch {

//         console.log("error");


//     }

// }


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },

    number: {
        type: Number,
        require: true,
        // unique: true

    },

    email: {

        type: String,
        require: true,
        unique: true

    },

    password: {
        type: String,
        require: true
    }
})


const User = mongoose.model("users", userSchema)

app.use(cors());
app.use(express.json())

app.post("/user", async (req, res) => {

    try {

        let { name, password, email, number } = req.body


        if (!name || !password || !email) {
            return res.json({
                status: true,
                message: "all field are require"
            })
        }

        // let { name, number, email } = await mongoose.find({ name: name, number: number, email: email })

        // if (name, number, email) {

        //     return res.json({
        //         status: true,
        //         message: "already exist"
        //     })

        // }




        let user = await User.create({
            name,
            password,
            email,
            number
        })


        res.json({
            status: true,
            message: "user created successfully",
            user: user
        })


    }

    catch (err) {

        console.log(err);


        res.json({
            status: false,
            message: err.message
        })

    }


})



app.get("/user", async (req, res) => {

    const user = await User.find()

    res.json({
        status: true,
        totalLength: user.length,
        data: user,

    })


})


app.get("/user/:id", async (req, res) => {

    const id = req.params.id

    const user = await User.findById(id)

    if (!user) {
        return res.json({
            status: true,
            message: "user not found"
        })

    }


    res.json({
        status: true,
        totalLength: user.length,
        data: user,

    })


})

app.delete("/user/:id", async (req, res) => {

    const id = req.params.id

    const user = await User.findByIdAndDelete(id)

    if (!user) {
        return res.json({
            status: true,
            message: "user not found"
        })
    }

    res.json({
        status: true,
        message: "user deleted successfully",
        data: user

    })


})

app.put("/user/:id", async (req, res) => {

    const id = req.params.id
    const data = req.body

    const user = await User.findById(id)

    if (!user) {
        return res.json({
            status: true,
            message: "user not found"
        })
    }

    const userUpdate = await User.findByIdAndUpdate(
        id,
        data,
        // {returnDocument: 'after'}
        { new: true }
    )

    res.json({
        status: true,
        message: "user updated successfully",
        data: userUpdate

    })


})








app.listen(5000, console.log("server running on 5000 PORT"))
