const { writeFile, readFile } = require('fs/promises');

exports.readTodos = () =>
  readFile('db/todolist.json', 'utf-8').then((res) => JSON.parse(res));

exports.writeTodos = (data) =>
  writeFile('db/todolist.json', JSON.stringify(data), 'utf-8');
