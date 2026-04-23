exports.courseEnrollmentEmail = (courseName, name) => {
    return \`<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Course Registration Confirmation</title>
        <style>
            body { background-color: #000814; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #DBDDEA; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; padding: 40px; background-color: #161D29; border-radius: 12px; border: 1px solid #2C333F; box-shadow: 0 20px 40px rgba(0,0,0,0.4); text-align: left; }
            .logo-container { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #2C333F; }
            .logo { max-width: 180px; }
            .message { font-size: 24px; font-weight: 700; margin-bottom: 24px; color: #F1F2FF; text-align: center; letter-spacing: -0.5px; }
            .body { font-size: 16px; margin-bottom: 30px; color: #AFB2BF; text-align: center; }
            .cta { display: inline-block; padding: 14px 32px; background-color: #FFD60A; color: #000814 !important; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 700; margin-top: 24px; text-align: center; transition: all 0.2s; box-shadow: 0 4px 14px rgba(255, 214, 10, 0.4); }
            .support { font-size: 14px; color: #6E727F; margin-top: 40px; text-align: center; border-top: 1px solid #2C333F; padding-top: 20px; }
            .support a { color: #47A5C5; text-decoration: none; }
            h2 { color: #FFD60A; font-size: 22px; text-align: center; margin: 20px 0; padding: 15px; background: #000814; border-radius: 8px; border: 1px solid #2C333F; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo-container">
                <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://res.cloudinary.com/dxiojxog8/image/upload/v1776942932/kptrch4ljllvqkud6wsv.png" alt="StudyNotion Logo"></a>
            </div>
            <div class="message">Enrollment Successful</div>
            <div class="body">
                <p>Congratulations <strong>\${name}</strong>!</p>
                <p>You have successfully secured your spot in the following course:</p>
                <h2>\${courseName}</h2>
                <p>Your learning dashboard is now fully unlocked. Get ready to build your future, one line of code at a time.</p>
                <br/>
                <a class="cta" href="https://studynotion-edtech-project.vercel.app/dashboard/enrolled-courses">Access Dashboard</a>
            </div>
            <div class="support">If you have any questions or need assistance, reach us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>.</div>
        </div>
    </body>
    </html>\`;
  };