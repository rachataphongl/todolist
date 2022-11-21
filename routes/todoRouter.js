const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.get('/getAllTodo', todoController.getAllTodos); //get all todos

router.post('/createTodo', todoController.createTodo); //create todo

router.patch('/editTodo/:id', todoController.editTodo); //edit todo

router.delete('/deleteTodo/:id', todoController.deleteTodo); //delete todo

module.exports = router;
