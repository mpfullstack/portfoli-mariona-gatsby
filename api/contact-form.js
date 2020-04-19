const cors = require('micro-cors');
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(data) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'info@marcperez.cat', // generated ethereal user
      pass: 'P84Uhyw6Vxamvk9T' // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'info@marcperez.cat', // sender address
    to: "markkus.80@gmail.com", // list of receivers
    subject: "Mariona Portfoli - Contact", // Subject line
    html: data.join('<br />') // html body
  });

  return info;
}

function success(res) {
  return res.json({
    status: 'sent'
  });
}

function failed(res) {
  return res.json({
    status: 'failed'
  });
}

const handler = (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(404).end();
  }

  sendEmail([
    `Nom: ${req.body.firstname}`,
    `Email: ${req.body.email}`,
    `${req.body.explainMe}`
  ])
    .then(result => {
      // handle incoming request as usual
      if (result.messageId) {
        success(res);
      } else {
        failed(res);
      }
    })
    .catch(() => {
      failed(res);
    });
}

module.exports = cors({
  allowMethods: ['POST'],
  origin: 'http://mariona.h.marcperez.cat'
})(handler);