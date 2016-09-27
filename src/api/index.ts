import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import * as express from 'express';

import Todo from '../models/Todo.model';

function handlerFactory() {
  return {
    query: async (req: express.Request, res: express.Response) => {
      const result = await Todo.find().exec();
      res.status(200).json({payload: result});
    },
    add: async (req: express.Request, res: express.Response) => {
      const result = new Todo(req.body);
      await result.save();
      res.status(200).json({payload: 'Success'});
    }
  }
}


export function Router() {
  const router = express.Router();

  
  router.get('/', handlerFactory().query);
  router.post('/', handlerFactory().add);


  return router;
}



