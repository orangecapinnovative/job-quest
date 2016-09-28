import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

import * as express from 'express';

import Todo from '../models/Todo.model';

function handlerFactory() {
  return {

    /** Fetch all Todo */
    query: async (req: express.Request, res: express.Response) => {
      const result = await Todo.find().exec();
      res.status(200).json({ payload: result });
    },

    /** Add new todo 
     *  method : json/post
     *  response : success or 403
     */
    add: async (req: express.Request, res: express.Response) => {

      if (!req.body.title) {
        res.send(403);
      } else {
        const result = new Todo(req.body);
        await result.save();
        res.status(200).json({ payload: 'Success' });
      }

    },
    remove: async (req, res) => {
      const params = req.params as {id: string};
      try{
        await Todo.remove({_id: params.id}).exec();
        res.status(200).json({payload: 'Success'});
      } catch(e){
        res.status(500).send(e.toString());
      }
      
    },
    /** 
     * Toogle Todo 
     * by id in url 
     * params :id 
     */
    toogle: async (req: express.Request, res: express.Response) => {
      const params = req.params as { id: number };
      if (!params.id) {
        res.status(403);
      }

      const todo = await Todo.findById(params.id);
      if (todo) {
        todo.done = !todo.done;
        await todo.save();
        res.status(200).json({payload: 'Success'});
      } else {
        res.status(404);
      }
    }
  }
}


export function Router() {
  const router = express.Router();

  router.get('/', handlerFactory().query);
  router.post('/', handlerFactory().add);
  router.put('/:id/toggle', handlerFactory().toogle);
  router.delete('/:id',handlerFactory().remove);
  return router;
}



