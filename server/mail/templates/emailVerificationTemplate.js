const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
            body { background-color: #000814; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #DBDDEA; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; padding: 40px; background-color: #161D29; border-radius: 12px; border: 1px solid #2C333F; box-shadow: 0 20px 40px rgba(0,0,0,0.4); text-align: left; }
            .logo-container { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #2C333F; }
            .logo { max-width: 180px; }
            .message { font-size: 24px; font-weight: 700; margin-bottom: 24px; color: #F1F2FF; text-align: center; letter-spacing: -0.5px; }
            .body { font-size: 16px; margin-bottom: 30px; color: #AFB2BF; text-align: center; }
            .support { font-size: 14px; color: #6E727F; margin-top: 40px; text-align: center; border-top: 1px solid #2C333F; padding-top: 20px; }
            .support a { color: #47A5C5; text-decoration: none; }
            .highlight { font-weight: 700; color: #FFD60A; font-size: 36px; letter-spacing: 8px; text-align: center; margin: 30px auto; padding: 20px; background: #000814; border-radius: 8px; border: 1px dashed #2C333F; max-width: 300px; }
		</style>
	</head>
	<body>
		<div class="container">
            <div class="logo-container">
                <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://res.cloudinary.com/dxiojxog8/image/upload/v1776942932/kptrch4ljllvqkud6wsv.png" alt="StudyNotion Logo"></a>
            </div>
			<div class="message">Verify Your Account</div>
			<div class="body">
				<p>Welcome to StudyNotion! To complete your registration securely, please use the following One-Time Password (OTP):</p>
				<div class="highlight">${otp}</div>
				<p style="font-size: 14px; color: #838894;">This code is valid for <strong>5 minutes</strong>. If you did not request this verification, please safely ignore this email.</p>
			</div>
			<div class="support">If you need technical assistance, reach out at <a href="mailto:info@studynotion.com">info@studynotion.com</a>.</div>
		</div>
	</body>
	</html>`;
};
module.exports = otpTemplate;