const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("Database is connected") })
    .catch((err) => { console.log('Could not connected to mongodb', err)})

// MiddleWare
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
    res.send("Welcome To Homepage");
})

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
    console.log("Backend Server is running now");
})