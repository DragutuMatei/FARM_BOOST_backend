const express = require("express");
const app = express();
const db = require("./models");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

app.use(bodyParser.json({
  limit: '50mb',
  extended: true
}))
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
}))
require('dotenv').config()


const userRouter = require('./routes/Users');
const emailRouter = require('./routes/Email');
const anunturiRouter = require('./routes/Anunturi');

app.use("/auth", userRouter);
app.use("/mes", emailRouter);
app.use("/anunturi", anunturiRouter);

 

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
  });
});