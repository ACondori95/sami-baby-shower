const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  completeTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.patch("/:id/complete", completeTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
