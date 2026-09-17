const nodeMailer = require("nodemailer")


const sendEmail = async ({ email, subject, message }) => {

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD 
        },

    })

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to:email,
        subject,
        text:message
    }

    await transporter.sendMail(mailOptions)


}


module.exports={sendEmail}
