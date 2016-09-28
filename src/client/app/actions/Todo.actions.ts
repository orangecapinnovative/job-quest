import RequestFactory from '../helpers/RequestFactory';
import * as fetch from 'isomorphic-fetch';

export const RELOAD_TODO = 'RELOAD_TODO';

const TodoAgent = RequestFactory();

export const reloadTodo = () => async (dispatch) => {
  const data = await TodoAgent.query();
  dispatch({
    type: RELOAD_TODO,
    payload: data.payload,
  })
}

export const toggleTodoById = (id: number) => async (dispatch) => {
    const data = await TodoAgent.toggle(id);
    dispatch(reloadTodo());
}

export const deleteTodoById = (id: number) => async (dispatch) => {
  const data = await TodoAgent.delete(id);
  dispatch(reloadTodo());
}

export const createTodo = (title: string) => async (dispatch) => {

  const data = await TodoAgent.add(title);
  if(data.payload === 'Success')
    dispatch(reloadTodo());
  else {
    alert(' Add failed' );
  }
}