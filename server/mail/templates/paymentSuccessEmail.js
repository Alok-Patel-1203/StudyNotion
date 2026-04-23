exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
    return \`<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Payment Confirmation</title>
          <style>
              body { background-color: #000814; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #DBDDEA; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 40px auto; padding: 40px; background-color: #161D29; border-radius: 12px; border: 1px solid #2C333F; box-shadow: 0 20px 40px rgba(0,0,0,0.4); text-align: left; }
              .logo-container { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #2C333F; }
              .logo { max-width: 180px; }
              .message { font-size: 24px; font-weight: 700; margin-bottom: 24px; color: #F1F2FF; text-align: center; letter-spacing: -0.5px; }
              .body { font-size: 16px; margin-bottom: 30px; color: #AFB2BF; }
              .support { font-size: 14px; color: #6E727F; margin-top: 40px; text-align: center; border-top: 1px solid #2C333F; padding-top: 20px; }
              .support a { color: #47A5C5; text-decoration: none; }
              .receipt-box { background: #000814; padding: 20px; border-radius: 8px; border: 1px solid #2C333F; margin-top: 20px; }
              .data-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #2C333F; }
              .data-label { color: #838894; font-weight: 500; font-size: 14px; }
              .data-value { color: #F1F2FF; font-weight: 600; font-size: 14px; text-align: right; }
              .amount-row { display: flex; justify-content: space-between; padding: 16px 0 4px 0; }
              .amount-label { color: #F1F2FF; font-weight: 700; font-size: 18px; }
              .amount-value { color: #06D6A0; font-weight: 800; font-size: 22px; text-align: right; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="logo-container">
                  <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://res.cloudinary.com/dxiojxog8/image/upload/v1776942932/kptrch4ljllvqkud6wsv.png" alt="StudyNotion Logo"></a>
              </div>
              <div class="message">Payment Receipt</div>
              <div class="body">
                  <p>Hello <strong>\${name}</strong>,</p>
                  <p>Thank you for choosing StudyNotion! Your transaction was completely successful. Below are your securely generated receipt details.</p>
                  
                  <div class="receipt-box">
                      <div class="data-row">
                          <span class="data-label">Payment ID</span>
                          <span class="data-value">\${paymentId}</span>
                      </div>
                      <div class="data-row">
                          <span class="data-label">Order ID</span>
                          <span class="data-value">\${orderId}</span>
                      </div>
                      <div class="amount-row">
                          <span class="amount-label">Total Paid</span>
                          <span class="amount-value">₹\${amount}</span>
                      </div>
                  </div>
              </div>
              <div class="support">If you require billing assistance or an invoice, please contact <a href="mailto:billing@studynotion.com">billing@studynotion.com</a>.</div>
          </div>
      </body>
      </html>\`
}