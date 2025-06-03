let todos = [];
let nextId = 1;

exports.createTodo = (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Le titre est requis" });
  }
  const todo = { id: nextId++, title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
};

exports.getTodos = (req, res) => {
  res.json(todos);
};

exports.getTodoById = (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: "Tâche non trouvée" });
  }
  res.json(todo);
};

exports.updateTodo = (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: "Tâche non trouvée" });
  }
  Object.assign(todo, req.body);
  res.json(todo);
};

exports.deleteTodo = (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Tâche non trouvée" });
  }
  const todo = todos.splice(index, 1)[0];
  res.json(todo);
};