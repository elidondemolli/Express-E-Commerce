const sgMail = require('@sendgrid/mail');
require('dotenv').config();
console.log(process.env.MAIL_API_KEY)

sgMail.setApiKey(process.env.MAIL_API_KEY);

const mail = (req, res) => {
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;

  const message = {
    to: req.body.to,
    from: req.body.from,
    subject: req.body.subject,
    html:`<strong>Name: ${name}</strong> <br>
          <strong>Phone: ${phoneNumber}</strong>` + '<br><br>' +req.body.text,
  };

  (async () => {
    try {
      await sgMail.send(message);
      return res.status(200).json({ message: 'sent' })
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();

}

module.exports = { mail }

