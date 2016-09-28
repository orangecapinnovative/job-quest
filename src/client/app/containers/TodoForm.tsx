import * as React from 'react';
import { connect } from 'react-redux';
import TodoItem from '../components/TodoItem';
import * as TodoActions from '../actions/Todo.actions';


interface TodoFormPropsType {
  addNewTodo(title: string): void;
  reload():void;
}
class TodoForm extends React.Component<TodoFormPropsType, {value: string}>{
  constructor(props){
    super(props);
    this.state = { value: ''};
  }
  handlerAddTodo(e) {
    this.props.addNewTodo(this.state.value);
    this.setState({value: ''});
  }
  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  render(){
    return (
      <div>
        <input value={this.state.value} placeholder='Type something' onChange={this.onChange.bind(this)} />
        <button onClick={this.handlerAddTodo.bind(this)}> {`Add`} </button>
        <button onClick={this.props.reload}> {`Refresh`} </button>
      </div>
    );
  }
}

const mapState = (state: AppState) => (
  {
    
  }
)
const mapDispatch = (dispatch) => (
  {
    addNewTodo: (title: string) => {
      dispatch(TodoActions.createTodo(title));
    },
    reload: () => {
      dispatch(TodoActions.reloadTodo());
    }
  }
)

export default connect(mapState, mapDispatch)(TodoForm);