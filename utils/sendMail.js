const nodeMailer = require("nodemailer");

const sendEmail = async (userEmail, userText, userSubject) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_APP_PASSWORD
      },
    });

    const info = await transporter.sendMail({
      from: {
        name:'Nodemailer App',
        address:'NodemailerApp@gmail.com'
      },
      to: userEmail,
      subject: userSubject,
      html: `
                <h3>You Have Recieved A New Message From NodeMailer App</h3>
                <p>${userText}</p>
                `,
    });
    return {
      info,
      success:true,
      message:'Mail Sent Successfully'
    };
  } catch (err) {
    return {
      success:false,
      error:err.message
    };
  }
};

module.exports = sendEmail;
