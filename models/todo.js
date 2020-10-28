const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  urgent: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
