import prisma from '../config/prismaClient.js';

export const createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Le titre est requis" });
  }
  try {
    const todo = await prisma.todo.create({
      data: { title },
    });
    res.status(201).json({
      data : todo,
      sucess: true
    });
  } catch (error) {
    console.error("Erreur lors de la création : ",error);
    res.status(500).json({
      message: "Erreur lors de la création",
      erreur: error.message,
      stack: error.stack,
      sucess: false
    });
  }
};


export const getTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
};

export const getTodoById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) return res.status(404).json({ error: "Tâche non trouvée" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
};

export const updateTodo = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: req.body,
    });
    res.json(todo);
  } catch (error) {
    res.status(404).json({ error: "Tâche non trouvée ou erreur de mise à jour" });
  }
};

export const deleteTodo = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const todo = await prisma.todo.delete({ where: { id } });
    res.json(todo);
  } catch (error) {
    res.status(404).json({ error: "Tâche non trouvée ou erreur de suppression" });
  }
};
