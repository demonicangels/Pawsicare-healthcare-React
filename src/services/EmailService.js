const transporter = () =>

function setNodemailer(){
    const nodemailer = require('nodemailer');

    transporter = nodemailer.createTransport({
    host : "smtp.elasticemail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'az@mail.com',
        pass: '33BBBC6E99A044DD9502108A63E0303C04C9'
    }
    });
}
function sendMail(email, message) {

    async function send(e) {
        e.preventDefault();
    
        const info = await transporter.sendMail({
            To : 'areliaherondale@gmail.com',
            From : email,
            Subject : "Contact form PawsiCare message",
            Body : message,
        });
    }
}
export default sendMail;