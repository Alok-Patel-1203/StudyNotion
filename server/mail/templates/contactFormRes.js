exports.contactUsEmail = (
    email,
    firstname,
    lastname,
    message,
    phoneNo,
    countrycode
  ) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Contact Form Confirmation</title>
        <style>
            body { background-color: #000814; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #DBDDEA; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; padding: 40px; background-color: #161D29; border-radius: 12px; border: 1px solid #2C333F; box-shadow: 0 20px 40px rgba(0,0,0,0.4); text-align: left; }
            .logo-container { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #2C333F; }
            .logo { max-width: 180px; }
            .message { font-size: 24px; font-weight: 700; margin-bottom: 24px; color: #F1F2FF; text-align: center; letter-spacing: -0.5px; }
            .body { font-size: 16px; margin-bottom: 30px; color: #AFB2BF; }
            .support { font-size: 14px; color: #6E727F; margin-top: 40px; text-align: center; border-top: 1px solid #2C333F; padding-top: 20px; }
            .support a { color: #47A5C5; text-decoration: none; }
            .data-row { padding: 12px 0; border-bottom: 1px solid #2C333F; }
            .data-label { color: #838894; font-weight: 500; display: block; margin-bottom: 4px; font-size: 14px; }
            .data-value { color: #F1F2FF; font-weight: 600; font-size: 16px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo-container">
                <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://res.cloudinary.com/dxiojxog8/image/upload/v1776942932/kptrch4ljllvqkud6wsv.png" alt="StudyNotion Logo"></a>
            </div>
            <div class="message">Contact Request Received</div>
            <div class="body">
                <p>Hello <span style="color: #F1F2FF; font-weight: 600;">${firstname} ${lastname}</span>,</p>
                <p>Thank you for reaching out to us. We have received your message and our support team will respond to you within 24 hours.</p>
                <br/>
                <div style="background: #000814; padding: 20px; border-radius: 8px; border: 1px solid #2C333F;">
                    <div class="data-row">
                        <span class="data-label">Full Name</span>
                        <span class="data-value">${firstname} ${lastname}</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label">Email Address</span>
                        <span class="data-value">${email}</span>
                    </div>
                    <div class="data-row">
                        <span class="data-label">Phone Number</span>
                        <span class="data-value">${phoneNo}</span>
                    </div>
                    <div class="data-row" style="border-bottom: none;">
                        <span class="data-label">Your Message</span>
                        <span class="data-value" style="font-weight: 400; color: #AFB2BF;">${message}</span>
                    </div>
                </div>
            </div>
            <div class="support">If you need immediate assistance, reply directly to this email or reach us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>.</div>
        </div>
    </body>
    </html>\`
  }