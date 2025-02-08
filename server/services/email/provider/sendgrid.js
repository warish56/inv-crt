
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendMail = async ({email, subject, text, html, cc='', bcc=[], attachments=[]}) => {
   
    const msg = {
        to: email, // Change to your recipient
        from: process.env.APP_EMAIL, // Change to your verified sender
        subject: subject,
        cc,
        bcc,
        text,
        html,
        attachments
      }
      return sgMail.send(msg)
}
       

module.exports ={
    sendMail
}



