export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(`Method not allowed. ${req.method}`, { status: 405 });
  }

  const { fullName, phone, email, description } = req.body;

  console.log(context);
  console.log(fullName, phone, email, description);

  const emailJsServiceId = process.env.VITE_EMAILJS_SERVICE_ID;
  const emailJsTemplateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailJsUserId = process.env.VITE_EMAILJS_USER_ID;
  const url = `https://api.emailjs.com/api/v1.0/email/send`;

  const emailData = {
    service_id: emailJsServiceId,
    template_id: emailJsTemplateId,
    user_id: emailJsUserId,
    template_params: {
      fullName,
      phone,
      email,
      description,
    },
  };

  try {
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(emailData),
    // });

    if (!response.ok) {
      throw new Error(`Failed to send email, status: ${response.status}`);
    }

    return new Response(`OK`, {status: 200});

  } catch (error) {
    console.error('Send email error:', error);

    return new Response(`Failed to send email: ${error}`, { status: 500 });
  }
};
