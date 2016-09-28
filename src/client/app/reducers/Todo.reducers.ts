import * as TodoActons from '../actions/Todo.actions';

export const todo = (state: TodoState, action: any): TodoState => {

  if(!state) {
    return {
      todos: [],
    }
  }
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case TodoActons.RELOAD_TODO :
      nextState.todos = [...action.payload];
      break;
    default:
      console.info('unknow action type')
      break;
  }
  return nextState;
}