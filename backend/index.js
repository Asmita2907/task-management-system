const express = require("express");
const dbConnect = require("./database");   // import database connection
const taskRoute = require("./routes/taskRoute");
const app = express();

app.use(express.json());

// connect database
dbConnect();

// test route
app.get("/", (req, res) => {
  res.send("Task Management API Running");
});

// routes
app.use("/task", taskRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});