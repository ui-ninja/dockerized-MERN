import {
  createTodo,
  deleteTodoById,
  getTodos,
  updateTodoById,
} from '../db/todos';
import express from 'express';

export const getAllTodos = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const todos = await getTodos();
    return res.json(todos);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const addTodo = async (req: express.Request, res: express.Response) => {
  try {
    if (req.body && req.body.title) {
      const addedTodo = await createTodo(req.body.title);
      return res.status(201).send(addedTodo);
    }
    return res.sendStatus(400);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send(error);
  }
};

export const updateTodo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (req.body && req.params && req.params.id) {
      const isUpdated = await updateTodoById(req.params.id, req.body);
      if (isUpdated) {
        return res.status(200).send({ updated: true });
      }
      return res.sendStatus(500);
    }
    return res.sendStatus(400);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send(error);
  }
};

export const deleteTodo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (req.params && req.params.id) {
      const result = await deleteTodoById(req.params.id);
      return res.status(200).send(result);
    }
    return res.sendStatus(400).send('Missing or incorrect id.');
  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send(error);
  }
};
