const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({todos});
  } catch (error) {
    res.status(500).json({message: "Error de Servidor"});
  }
};

exports.createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({text: req.body.text});
    const todo = await newTodo.save();
    res.status(201).json({todo});
  } catch (error) {
    res.status(500).json({message: "Error de Servidor"});
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {text: req.body.text},
      {new: true}
    );
    if (!todo) return res.status(404).json({message: "Todo no encontrada"});
    res.json({todo});
  } catch (error) {
    res.status(500).json({message: "Error de Servidor"});
  }
};

exports.completeTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {completed: true},
      {new: true}
    );
    if (!todo) return res.status(404).json({message: "Todo no encontrada"});
    res.json({todo});
  } catch (error) {
    res.status(500).json({message: "Error de Servidor"});
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({message: "Todo no encontrada"});
    res.json({message: "Todo eliminada"});
  } catch (error) {
    res.status(500).json({message: "Error de Servidor"});
  }
};
