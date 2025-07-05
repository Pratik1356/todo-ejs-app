// app.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Set EJS as templating engine
app.set("view engine", "ejs");

// Middleware for serving static files and parsing form data
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory task list
let todos = [];
let idCounter = 1;

// GET: Home page with optional priority filter
app.get("/", (req, res) => {
  const filter = req.query.priority;
  const filteredTodos = filter
    ? todos.filter(todo => todo.priority === filter)
    : todos;
  res.render("index", { todos: filteredTodos, filter });
});

// POST: Add a new task
app.post("/add", (req, res) => {
  const { content, priority } = req.body;
  if (!content.trim()) {
    return res.send(
      "<script>alert('Please enter a task.'); window.history.back();</script>"
    );
  }
  todos.push({ id: idCounter++, content, priority, isDone: false });
  res.redirect("/");
});

// POST: Mark task as done/undone
app.post("/done/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.isDone = !todo.isDone;
  }
  res.redirect("/");
});

// POST: Edit a task
app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { content, priority } = req.body;
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.content = content.trim();
    todo.priority = priority;
  }
  res.redirect("/");
});

// POST: Delete a task
app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.redirect("/");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${3000}`);
});
