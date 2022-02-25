const nodemailer = require('nodemailer')

export default function sendMail(req, res) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kamren.keeling30@ethereal.email',
        pass: '7TKjRU9Wa75EpX8hWX'
    }
  });
    transporter.sendMail({
      from: `"Teste" < ${req.body.email} >`,
      to: `"Kamren Keeling" <kamren.keeling30@ethereal.email>`,
      replyTo: req.body.email,
      subject: req.body.subject,
      text: req.body.message,
      html: `<b>${req.body.message}</b>`
    }).then(response => res.send(response))
    .catch((error) => res.send(error))
}
