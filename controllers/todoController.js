const { readTodos, writeTodos } = require('../db/todo');
const { v4: uuidv4 } = require('uuid');

exports.getAllTodos = async (req, res, next) => {
  try {
    const oldTodos = await readTodos();
    // res.status(200).send('hi');
    if (oldTodos.length === 0) {
      return res.status(200).json({ total: 0, todos: `Don't have todo.` });
    }
    res.status(200).json({ total: oldTodos.length, todos: oldTodos });
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed = false } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).send('title is required');
    }
    if (typeof completed !== 'boolean') {
      return res.status(400).send('completed must be a boolean');
    }

    const newTodo = { title, completed, id: uuidv4() };
    const oldTodos = await readTodos();
    oldTodos.unshift(newTodo);
    await writeTodos(oldTodos);
    res.status(201).json({ todo: newTodo });
  } catch (err) {
    next(err);
  }
};

exports.editTodo = async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    const { id } = req.params;
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required.' });
    }

    if (typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'Completed is required.' });
    }

    const allTodo = await readTodos();
    const update = { title, completed, id };
    const updatedTodo = allTodo.map((item) => (item.id === id ? update : item));
    await writeTodos(updatedTodo);

    res.status(200).json({ message: 'success update' });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const allTodo = await readTodos();

    const todo = allTodo.filter((item) => item.id !== id);
    await writeTodos(todo);
    res.status(200).json({ message: 'success delete' });
  } catch (err) {
    next(err);
  }
};
