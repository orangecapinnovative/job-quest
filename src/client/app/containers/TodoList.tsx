import * as React from 'react';
import { connect } from 'react-redux';
import TodoItem from '../components/TodoItem';
import * as TodoActions from '../actions/Todo.actions';
interface TodoListPropsType {
  todos: ITodo[];
  reload():void;
}
class TodoList extends React.Component<TodoListPropsType, {}>{
  componentWillReceiveProps(){
    this.props.reload();
  }
  render(){
    return (
      <div>
        <div>
          {`Todo List`}
        </div>
        <ul>
        {
          this.props.todos.map( (i, k) => <TodoItem {...i} key={k} /> )
        }
        </ul>
      </div>
    );
  }
}

const mapState = (state: AppState) => (
  {
    todos: state.todo.todos
  }
)
const mapDispatch = (dispatch) => (
  {
    reload: () => {
      console.log('dispatch');
      dispatch(TodoActions.reloadTodo());
    }
  }
)

export default connect(mapState, mapDispatch)(TodoList);