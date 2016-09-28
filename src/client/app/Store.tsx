
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


import { todo } from './reducers/Todo.reducers';

const Store = createStore<any>(combineReducers<AppState>({ todo }), {
  todo: { todos: [] },
}, compose(
  applyMiddleware(thunk)));

export default Store;
