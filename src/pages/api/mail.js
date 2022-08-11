const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const { name, email, message } = req.body;
  await mail.send({
    to: 'pedrolcsferreira@gmail.com',
    from: { name, email: 'pedro@pedroferreira.dev' },
    subject: `New Message<${email}>`,
    text: message,
  });
  res.status(200).json({ status: 'Ok' });
};
