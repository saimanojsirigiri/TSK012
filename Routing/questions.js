const express = require("express");

const route = express.Router();
const createError = require("http-errors");

const ques = require("../Database/Questions.database");

const { generateCrudOperations } = require("../Services/crudOperations");
const bcrypt = require("bcrypt");

const crudOperations = generateCrudOperations(ques);

route.get("/fetchAllQuestions", async (req, res, next) => {
  crudOperations
    .getAll()
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

route.get("/fetchByTopic/:Topic", async (req, res, next) => {
  const topic = req.params.Topic;
  crudOperations
    .getByTopic(topic)
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

route.get("/randomQuestion", async (req, res, next) => {
  // try {
  //   const count = await ques.countDocuments();
  //   if (count === 0) {
  //     res.status(404).json({ error: "No questions found." });
  //   } else {
  //     const randomIndex = Math.floor(Math.random() * count);

  //     const randomQuestion = await ques.findOne().skip(randomIndex);
  //     res.json(randomQuestion);
  //   }
  // } catch (err) {
  //   next(err);
  // }

  try {
    const unAnsweredQuestions = await ques.find({ isAnswered: false });

    if (unAnsweredQuestions.length === 0) {
      res.status(404).json({ error: "No unanswered questions found" });
    }

    const randomIndex = Math.floor(Math.random() * unAnsweredQuestions.length);

    const randomQuestion = unAnsweredQuestions[randomIndex];
    res.json(randomQuestion);
  } catch (err) {
    next(err);
  }
});

route.post("/postData", async (req, res, next) => {
  const arrayData = Array.isArray(req.body) ? req.body : [req.body];
  try {
    const savedQuestions = await Promise.all(
      arrayData.map(async (questionData) => {
        const { que, opt, ans, topic, isAnswered } = questionData;
        const hashedAns = await bcrypt.hash(ans, 10);

        const newQuestion = new ques({
          que,
          opt,
          ans: hashedAns,
          topic,
          isAnswered,
        });
        return newQuestion.save();
      })
    );
    res
      .status(201)
      .json({ message: "Questions Saved Successfully", ques: savedQuestions });
  } catch (err) {
    next(err);
  }
});

module.exports = route;
