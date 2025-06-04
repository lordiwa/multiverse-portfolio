const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: functions.config().email.user,
        pass: functions.config().email.pass
    }
});

exports.sendEmail = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).send('Method not allowed');
        }

        try {
            const { email, subject, message } = req.body;

            const mailOptions = {
                from: functions.config().email.user,
                to: 'srparca@gmail.com',
                subject: `Portfolio Contact: ${subject}`,
                html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
                replyTo: email
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    });
});