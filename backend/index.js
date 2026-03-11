const express = require("express");
require('dotenv').config();
const cors = require("cors");
const dbConnect = require("./database");
const taskRoute = require("./routes/taskRoute");
const authRoutes = require("./routes/authRoute");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);

dbConnect();

app.use("/task", taskRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});