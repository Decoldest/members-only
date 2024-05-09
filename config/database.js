const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();

const mongoDB = process.env.DB_STRING;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
