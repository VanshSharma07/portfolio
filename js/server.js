const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Nodemailer to use Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'portfoliovansh@gmail.com', // Your Gmail email address
    pass: 'vansh070704' // Your Gmail password or App Password if you have 2-Step Verification enabled
  }
});

app.post('/submit-form', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  const mailOptions = {
    from: 'your_email@gmail.com', // Sender address
    to: 'vanshbargotra07@gmail.com', // Receiver address
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.send('Error sending email. Please try again later.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Form submitted successfully!'); // Or you can redirect the user to a thank-you page
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
