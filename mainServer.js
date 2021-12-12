const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config()
const bodyParser = require("body-parser");
const loginRouter = require("./routes/login.route")
const adminRouter = require("./routes/admin.route")
const mongoose =require("mongoose");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/",loginRouter);
app.use("/",adminRouter);
mongoose.connect(
    `mongodb+srv://asadhm:${process.env.MONGODB_PASSWORD}@cluster0.jdmn4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to DB");
    }
  );

app.listen(process.env.PORT || 4002, () => {
  console.log(`listening of port ${process.env.PORT || 4002}`);
});
