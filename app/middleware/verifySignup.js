const db = require("../models");
var jwt =require("jsonwebtoken");
const config = require("../config/email.config");
const nodemailer = require("nodemailer");
const User = db.user;

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // Outlook SMTP server
    port: 587, // Port for secure TLS
    secure: false,
    auth: {
        user: config.gmail_user,
        pass: config.gmail_password,
    },
    tls: {
        ciphers: "SSLv3",
    },
});

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }

        next();

    });
};

verifyEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            jwt.sign(
                {
                    email: req.body.email,
                },
                config.email_secret,
                {
                    expiresIn: '1d',
                },
                (err, emailToken) => {
                    const url = `http://localhost:3000/api/confirmation/${emailToken}`;

                    transporter.sendMail({
                        to: req.body.email,
                        subject: 'Confirm Email',
                        html: `Please click this email to confirm your email <a href="${url}">${url}</a>`
                    });
                },
            )

            next();
    });
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    verifyEmail: verifyEmail
};

module.exports = verifySignUp;