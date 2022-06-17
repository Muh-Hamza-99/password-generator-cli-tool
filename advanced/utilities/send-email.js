const SendGrid = require("@sendgrid/mail");
SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async () => {
    const message = {
        to: process.env.EMAIL,
        from: "codingtimelapseyt@gmail.com",
        subject: "Secret Token",
        text: "Here your secret token. Please be sure to not share it with anyone.",
        html: `<strong>${process.env.SECRET_KEY}</strong>`,
    };
    SendGrid.send(message);
};

module.exports = sendEmail;