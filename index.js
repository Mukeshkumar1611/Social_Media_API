const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const connectDatabase = require("./config/connectDatabase");
dotenv.config();

connectDatabase();

// MiddleWare
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
    res.send("Welcome To Homepage");
})

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT, () => {
    console.log("Backend Server is running now");
})