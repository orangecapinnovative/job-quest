import React from 'react';
import 'whatwg-fetch';
export default class TodoApp extends React.Component {
  constructor(props) {
    super()
    this.state = {
      todos: [],
      newTodo: '',
    };
    this.toggle = this.toggle.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.newTodoChange = this.newTodoChange.bind(this);
  }
  componentDidMount() {
    fetch('http://localhost:3001').then((data) => data.json()).then((data) => {this.setState({todos: data})})
  }
  toggle(id) {
    fetch('http://localhost:3001/'+id+'/toggle', {method: 'POST'})
    .then(() => fetch('http://localhost:3001')).then((data) => data.json()).then((data) => {this.setState({todos: data})})
  }
  delete(id,e) {
    fetch('http://localhost:3001/'+id, {method: 'DELETE'})
    .then(() => fetch('http://localhost:3001')).then((data) => data.json()).then((data) => {this.setState({todos: data})})
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  add(title) {
    fetch('http://localhost:3001', {method: 'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify({title:title})})
    .then(() => fetch('http://localhost:3001')).then((data) => data.json()).then((data) => {this.setState({todos: data,newTodo:''})})
  }
  newTodoChange(e) {
    this.setState({newTodo: e.target.value})
  }
  render() {
    return <div>
      <div>
        <input type="text" onChange={this.newTodoChange} value={this.state.newTodo} />
        <button onClick={this.add.bind(this, this.state.newTodo)}>Add</button>
      </div>
      <ul>
        {
          this.state.todos && this.state.todos.map((todo) => <li style={{textDecoration: todo.done ? 'line-through' : 'initial'}} onClick={this.toggle.bind(this,todo._id)}>{todo.title} <button onClick={this.delete.bind(this,todo._id)}>Delete</button></li>)
        }
      </ul>
    </div>;
  }
}
