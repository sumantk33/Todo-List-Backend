const express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();

const Todo = require("../models/todo");

// @desc    Get all todos
// @route   GET /api/
// @access  Public
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// @desc    Add a todo
// @route   POST /api/todos
// @access  Public
router.post("/todos", async (req, res) => {
  const { message, urgent, date } = req.body;

  try {
    const newTodo = new Todo({
      message,
      urgent,
      date,
    });

    const conn = await newTodo.save();
    res.status(201).json(conn);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// @desc    Update a todo
// @route   /todos/:id
// @access  Public
router.put("/todos/:id", async (req, res) => {
  const exists = await Todo.findById(req.params.id);

  if (!exists) {
    return res.status(404).json({ msg: "Todo not found" });
  }

  const { message, urgent, date } = req.body;

  const updatedTodo = {};
  if (message) updatedTodo.message = message;
  if (urgent) updatedTodo.urgent = urgent;
  if (date) updatedTodo.date = date;

  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: updatedTodo },
      { $new: false }
    );

    res.send(todo);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
