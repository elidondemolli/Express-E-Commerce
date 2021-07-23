const nodemailer = require('nodemailer');
require('dotenv').config();

const mail = (req, res) => {
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
  });

  let mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    html:`<strong>Name: ${name}</strong> <br>
          <strong>Phone: ${phoneNumber}</strong> <br>
          <strong>Email: ${email}</strong>` + '<br><br>' +req.body.text,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('email sent');
    }
  });

  return res.status(200).json({ message: 'sent' })
}

module.exports = { mail }

