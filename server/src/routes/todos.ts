import {
  addTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from '../controllers/todos';
import { Router } from 'express';

export default (router: Router) => {
  router.get('/v1/api/todos', getAllTodos);
  router.post('/v1/api/todo', addTodo);
  router.patch('/v1/api/todo/:id', updateTodo);
  router.delete('/v1/api/todo/:id', deleteTodo);
};
