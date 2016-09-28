import * as React from 'react';
import { connect } from 'react-redux';
import TodoItem from '../components/TodoItem';
import * as TodoActions from '../actions/Todo.actions';

const styles = require('./TodoList.scss');

interface TodoListPropsType {
  todos: ITodo[];
  reload():void;
  handleDelete(id: number): void;
  handleToggle(id: number): void;
}
class TodoList extends React.Component<TodoListPropsType, {}>{
  componentDidMount(){
    this.props.reload();
  }
  render(){
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          {`Todo List`}
        </div>
        {
          this.props.todos.length ? null : <div className={styles.noTodo}>{'No todo'}</div>
        }
        <ul>
        {
          this.props.todos.map( (i, k) => <TodoItem onDelete={this.props.handleDelete} onToggle={this.props.handleToggle} {...i} key={k} /> )
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
      dispatch(TodoActions.reloadTodo());
    },
    handleToggle: (id) => {
      dispatch(TodoActions.toggleTodoById(id));
    },
    handleDelete: (id) => {
      dispatch(TodoActions.deleteTodoById(id));
    }
  }
)

export default connect(mapState, mapDispatch)(TodoList);