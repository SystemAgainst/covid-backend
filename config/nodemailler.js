const nodemailer = require('nodemailer');
const ApiError = require("../errors/apiError");

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    },
    debug: true,
    logger: true,
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Ошибка при проверке транспортер: ", error);
    } else {
        console.log("Сервер готов принимать сообщения: ", success);
    }
});

const sendMail = (mailOptions, callback) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка при отправке письма: ', error);
            return callback(error, null);
        }
        callback(null, info);
    });
};

module.exports = sendMail;
