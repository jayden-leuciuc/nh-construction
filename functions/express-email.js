import express from 'express';
import serverless from 'serverless-http';
import fetch from 'node-fetch';

const app = express();
const router = express.Router();
app.use(express.json());

router.post('/', async (req, res) => {
    const { fullName, phone, email, description } = req.body;

  const emailJsServiceId = process.env.VITE_EMAILJS_SERVICE_ID;
  const emailJsTemplateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailJsUserId = process.env.VITE_EMAILJS_USER_ID;
  const emailJsAccessToken = process.env.EMAILJS_ACCESS_TOKEN;
  const url = `https://api.emailjs.com/api/v1.0/email/send`;

  const emailData = {
    service_id: emailJsServiceId,
    template_id: emailJsTemplateId,
    user_id: emailJsUserId,
    accessToken: emailJsAccessToken,
    template_params: {
      fullName,
      phone,
      email,
      description,
    },
  };

  try {
    const emailResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!emailResponse.ok) {
      throw new Error(`Failed to send email, status: ${emailResponse.status}`);
    }

    const responseData = await emailResponse.text();
    res.status(200).json({ message: 'Email sent successfully', details: responseData });
  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.use('/.netlify/functions/express-email', router);


const handler = serverless(app);

export default handler ;