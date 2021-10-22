const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const db = require("./app/models");
// db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and re-sync db");
// });

var corsOption = {
    origin : 'https://localhost:8081',
};


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/department.route.js")(app);
require("./app/routes/employee.route.js")(app);

//Simple Route
app.get('/', (req,res) => {
    res.json({ message: 'Welcome to Node.js' });
});

//Set Port and listen for request
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});