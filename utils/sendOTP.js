import brevo from '@getbrevo/brevo';
import emailTemplate from './emailTemplate.js';

export default async function sendOTP(email, otp) {
  const apiInstance = new brevo.TransactionalEmailsApi();
  let apiKey = apiInstance.authentications['apiKey'];
  
  console.log(apiKey);

  apiKey.apiKey = process.env.BREVO_MAIL_API_KEY;
  console.log(apiKey);

  try {
    let smtpEmail = new brevo.SendSmtpEmail();
    smtpEmail.subject = "Verification OTP for roc8_ecomm assignment app";
    smtpEmail.htmlContent = emailTemplate(otp);
    smtpEmail.sender = {
      email : "authentication@roc8_ecomm.com",
      name : "Anmol Kumar the fullstack developer @ roc8_ecomm"
    };
    smtpEmail.to = [
      {
        email : email
      }
    ];

    const sendEmail = await apiInstance.sendTransacEmail(smtpEmail);
    return {status : 200, message : sendEmail};
  } catch (error) {
    console.log(error);
    return {status : 500, message : error.message}
  }
}