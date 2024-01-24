const express = require("express")
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db =require("./app/models");

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Database with { force: false }');
});
app.get("/api", (req, res) => {
    res.json({
        message:"api is working correctly"
    })
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


app.listen(port, () => console.log(`app listening on port ${port}`));