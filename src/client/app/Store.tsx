
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


import { todo } from './reducers/Todo.reducers';

const Store = createStore(combineReducers<AppState>({ todo }), {
  todo: { todos: [] }
}, compose(
  applyMiddleware(thunk)));

export default Store;