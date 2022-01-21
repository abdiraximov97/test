const nodemailer = require("nodemailer");

module.exports.email = async function email(to, subject, mail_body, mail_html) {
    const transport = await nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
            user: "abdiraximov.shaxboz97@mail.ru",
            pass: "79zobxash",
        },
    });

    let info =  await transport.sendMail({
        from: '"Assalomu alaykum" <abdiraximov.shaxboz97@mail.ru>', // sender address
            to: mailTo, // list of receivers
            subject: "Iltimos parolingizni tasdiqlang! ✔", // Subject line
            html, // html body
    });
    
    return info
};

