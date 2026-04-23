exports.passwordUpdated = (email, name) => {
	return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body { background-color: #000814; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #DBDDEA; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; padding: 40px; background-color: #161D29; border-radius: 12px; border: 1px solid #2C333F; box-shadow: 0 20px 40px rgba(0,0,0,0.4); text-align: left; }
            .logo-container { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #2C333F; }
            .logo { max-width: 180px; }
            .message { font-size: 24px; font-weight: 700; margin-bottom: 24px; color: #F1F2FF; text-align: center; letter-spacing: -0.5px; }
            .body { font-size: 16px; margin-bottom: 30px; color: #AFB2BF; text-align: center; }
            .support { font-size: 14px; color: #6E727F; margin-top: 40px; text-align: center; border-top: 1px solid #2C333F; padding-top: 20px; }
            .support a { color: #47A5C5; text-decoration: none; }
            .highlight-box { color: #EF476F; background: #000814; padding: 15px; border-radius: 8px; border: 1px solid #2C333F; text-align: center; margin: 20px 0; font-weight: 600; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo-container">
                <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://res.cloudinary.com/dxiojxog8/image/upload/v1776942932/kptrch4ljllvqkud6wsv.png" alt="StudyNotion Logo"></a>
            </div>
            <div class="message">Password Successfully Updated</div>
            <div class="body">
                <p>Hello <strong>${name}</strong>,</p>
                <p>We are writing to confirm that the password for your account has been successfully updated.</p>
                <div class="highlight-box">Email: ${email}</div>
                <p style="font-size: 14px; color: #838894;">If you initiated this change, no further action is required. If you did <strong>NOT</strong> request this change, please contact us immediately to secure your account.</p>
            </div>
            <div class="support">Reach our security team anytime at <a href="mailto:security@studynotion.com">security@studynotion.com</a>.</div>
        </div>
    </body>
    </html>`;
};