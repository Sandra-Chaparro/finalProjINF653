const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const path = require("path");
const { verify } = require("crypto");
const cors = require("cors");
// const corsOptions = require("./config/corsOptions");
// const { logger } = require("./middleware/logEvents");
// const errorHandler = require("./middleware/errorHandler");
// const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3500;

//Connect to mongoDB
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
//Routes
app.use("^/$ || index(.html)?", require("./public/root"));
app.use("/", require("./public/api/states"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("text/html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port: ' ${PORT}`));
});
