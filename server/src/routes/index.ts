import express from 'express';
import todos from './todos';

const router = express.Router();

export default () => {
  todos(router);
  return router;
};
