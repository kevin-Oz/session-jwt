const sgMail = require('@sendgrid/mail')

/*
envio de correo de bienvenida
*/
const mail = {
    sendMail: (toMail, subject, text) => {
      console.log('apikey: '+ process.env.SENDGRID_API_KEY);
      sgMail.setApiKey('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');
      const msg = {
         to: `${toMail}`, 
         from: 'gf15006@ues.edu.sv',
         subject: subject,
         text: text,
         html: '<strong>Wellcome ! ya puedes empezar a almacenar tus notas :)</strong>',
     }
     console.log('sending...')
    sgMail.send(msg).then(() => {
    console.log('Email sent')
    }).catch((error) => {
    console.error(error)
    });
    }
 }

 module.exports = {mail}
