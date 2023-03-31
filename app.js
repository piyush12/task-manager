const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require('./middleware/error-handler');

const port = 5000;

app.use(express.static("./public"))
app.use(express.json());

app.use("/api/v1/tasks", tasks);
app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`listening to port ${port}`));
  } catch (error) {
    console.log("ERROR ON CONNECTION --", error);
  }
};

start();
