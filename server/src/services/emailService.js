const { transporter } = require('../config/mailer');

const sendRegistrationEmail = async ({ to, name, role }) => {
  if (!to) return;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Welcome to EduConnect',
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for registering as a ${role} on EduConnect.</p>
      <p>We will notify you once your account is reviewed.</p>
      <p>Best regards,<br/>EduConnect Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.warn('⚠️  Unable to send registration email:', error.message);
  }
};

module.exports = {
  sendRegistrationEmail,
};

