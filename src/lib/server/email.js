import nodemailer from "nodemailer"
import { SMTP_EMAIL, SMTP_EMAIL_PASSWORD } from "$env/static/private"

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_EMAIL_PASSWORD
    }
});

export const sendEmail = async (recipients, subject, html) => {
    const mailOptions = {
        from: SMTP_EMAIL,
        to: recipients,
        subject: subject,
        html
    };

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify((e, success) => {
            if (e) {
                console.log(e);
                reject(e);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailOptions, (e, info) => {
            if (e) {
                console.error(e);
                reject(e);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });
};
