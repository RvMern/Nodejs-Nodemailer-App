const nodeMailer = require("nodemailer");

const sendEmail = async (userEmail, userText, userSubject) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com", // ! Your SMTP provider's hostname
      port: 465,   // ! Use the recommended port for secure SMTP
      secure: true,  // ! Use TLS encryption
      auth: {
        user: process.env.SENDER_EMAIL,  // Your email id
        pass: process.env.SENDER_APP_PASSWORD // Your google app password for the above email id
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
