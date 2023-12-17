const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { log } = require("console");

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
});

// questions.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashAnswer = await bcrypt.hash(this.ans, salt);
//     this.ans = hashAnswer;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

const Ques = mongoose.model("ques", questions);

module.exports = Ques;
