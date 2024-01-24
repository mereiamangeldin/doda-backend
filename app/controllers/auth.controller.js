const db =require("../models");
const config = require("../config/auth.config");
const User = db.user;
const emailConfig = require("../config/email.config")

var jwt =require("jsonwebtoken");
var bcrypt =require("bcryptjs");

exports.emailConfirmation = async (req, res) => {
    try{
        const decodedToken = jwt.verify(req.params.token, emailConfig.email_secret);
        const email = decodedToken.email;
        console.log(email);
        await User.update({ confirmed: true }, {where: {email} });
        return res.redirect('http://localhost:3000/api/signin');
    } catch (e){
        res.send('email confirmation error');
    }
};

exports.signUp = (req, res) => {
    User.create({
        first_name:req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password:bcrypt.hashSync(req.body.password, 8),
        ranking: 0,
        licence_number: 1
    })
    .then(user => {
        res.send({ message: "User registered successfully!" });
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.signIn = (req, res) => {
    User.findOne({
        where: {
            email:req.body.email
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        if(!user.confirmed) {
            return res.status(400).send({ message: "Please confirm your email to login" });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

