const credentials = require("../config/emailcredentials")
const nodemailer = require('nodemailer')

// nodemailer.createTransport({
//     host: "smtp.example.com",
//     port: 587,
//     secure: false, // upgrade later with STARTTLS
//     auth: {
     
//     }
//   });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: credentials.username,
        pass: credentials.password
    }
  });
  
  const mailOptions = {
    from: credentials.username,
    to: credentials.username,
    subject: 'Invoices due',
    text: 'Dudes, we really need your money.'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
