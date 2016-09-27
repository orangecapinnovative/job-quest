import RequestFactory from '../helpers/RequestFactory';
import * as fetch from 'isomorphic-fetch';

export const RELOAD_TODO = 'RELOAD_TODO';

const TodoAgent = RequestFactory();

export const reloadTodo = () => async (dispatch) => {
  const data = await TodoAgent.query();
  dispatch({
    type: RELOAD_TODO,
    payload: data,
  })
}

export const toogleTodoById = (id: number) => async (dispatch) => {
    const todolist = await TodoAgent.toogle(id);
    dispatch({
      type: RELOAD_TODO,
      payload: todolist,
    })
}

export const createTodo = (title: string) => async (dispatch) => {
  const todolist = await TodoAgent.add(title);
  dispatch({
    type: RELOAD_TODO,
    payload: todolist
  })
}