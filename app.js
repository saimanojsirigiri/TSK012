const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();

require("./helper/init_mongodb");

const route = require("./Routing/questions");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res, next) => {
  res.send("Hello");
});

app.use("/api", route);

app.use(async (req, res, next) => {
  next(createError.NotFound("Url doesnt exist"));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: "Question details not exist",
    },
  });
  console.log(err);
});

const PORT = process.env.PORT || 3031;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
