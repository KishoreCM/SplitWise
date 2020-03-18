const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/database");
var pg = require("pg");
delete pg.native;
//const Sequelize = require("sequelize");

const app = express();

const formidable = require("express-formidable");

app.use(formidable());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.authenticate()
  .then(() => console.log("Database Connected!!!"))
  .catch(err => console.log("Error: " + err));

const models = {
  Users: require("./models/Users"),
  Groups: require("./models/Groups"),
  Expense: require("./models/Expense"),
  Friends: require("./models/Friends")
};

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

/*
models.sequelize
  .sync()
  .then(() => console.log("Models synced and connected to database!!!"))
  .catch(err => console.log("Error: " + err));
*/

app.get("/", (req, res) => res.send("HI!.."));

app.use("/app", require("./routes/route"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
