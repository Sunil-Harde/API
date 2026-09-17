

const profile = (req, res) => {


    let user = req.user

    if (!user) {

        return res.json({
            success: false,
            message: "User not Found"
        })

    }


    res.json({
        success: true,
        message: "User Profile",
        user: user
    })


}

module.exports = { profile }