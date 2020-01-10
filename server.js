const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true},
  () => {
    console.log("who on light");
  }
);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use("/api", authRoutes);

 

app.listen(8080);
