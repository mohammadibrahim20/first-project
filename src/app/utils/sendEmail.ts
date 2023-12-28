import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production' ? true : false,
    auth: {
      user: 'ibinfo2017bd@gmail.com',
      pass: 'sjrk ppce irrv jxiw',
    },
  });
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'ibinfo2017bd@gmail.com', // sender address
      to: email,
      subject: 'Forget your password ✔', // Subject line
      text: 'Hello world?', // plain text body
      html,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  }

  main().catch(console.error);
};
