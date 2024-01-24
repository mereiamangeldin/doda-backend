const controller =require("../controllers/auth.controller");
const {verifySignUp} = require("../middleware");
module.exports = function (app){
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/confirmation/:token', controller.emailConfirmation);

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateEmail,
            verifySignUp.verifyEmail
        ],
        controller.signUp
    );
    app.post("/api/auth/signin", controller.signIn);
}