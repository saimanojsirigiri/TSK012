const mongoose = require("mongoose");
const schema = mongoose.Schema;

const questions = new schema({
  que: {
    type: String,
    required: true,
  },
  opt: {
    type: Array,
    required: true,
  },
  ans: {
    type: String,
  },
  topic: {
    type: String,
    required: true,
  },
  isAnswered: {
    type: Boolean,
    default: false,
  },
  timeLimit: {
    type: String,
  },
});

const Ques = mongoose.model("ques", questions);

module.exports = Ques;
