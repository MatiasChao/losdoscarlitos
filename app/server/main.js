var nodemailer = require('nodemailer')
var express = require('express')
var app = express()

app.post('/send-email', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'matiaschao22@gmail.com',
            pass: 'Ireland22!'
        }
    })

    var mailOptions = {
        from: 'Remitente',
        to: 'matiaschao22@hotmail.com',
        subject: 'Prueba',
        text: 'Vamo arriba carajo !!!!!'
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            res.status(500).end(error.message)
        } else {
            console.log("email enviado!")
            res.status(200).jsonp(req.body)
        }
    })

})


app.listen(3000, () => {
  console.log("Servidor en -> http://localhost:3000")
})
