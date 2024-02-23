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

const PORT = process.env.PORT || 3031;

app.get("/", async(req, res, next) => {
    res.send("Hi");
});

app.use("/api", route);

app.use(async(req, res, next) => {
    next(createError.NotFound("Url doesnt exist"));
});

app.use(async(err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: "Question not found",
        },
    });
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});