const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use("/api", require("./routes/todos"));

app.listen(PORT, () =>
  console.log(
    `Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);
