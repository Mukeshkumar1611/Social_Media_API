const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("Database is connected") })
    .catch((err) => { console.log('Could not connected to mongodb', err)})

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.get("/", (req, res) => {
    res.send("Welcome To Homepage");
})

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
    console.log("Backend Server is running now");
})