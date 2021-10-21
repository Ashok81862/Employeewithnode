const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const db = require("./app/models");
// db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and re-sync db");
// });


app.use(cors());
app.use(bodyParser.json());


//Simple Route
app.get('/', (res,req) => {
    res.json({ error: "Welcome to Node.js" });
})

require("./app/routes/department.route.js")(app);
require("./app/routes/employee.route.js")(app);


//Set Port and listen for request
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});