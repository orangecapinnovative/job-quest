import React from 'react';
import 'whatwg-fetch';
import TodoInput from './TodoApp/TodoInput';
import TodoList from './TodoApp/TodoList';
import TodoFilter from './TodoApp/TodoFilter';
import TodoToggleAll from './TodoApp/TodoToggleAll';

export default class TodoApp extends React.Component {
    constructor(props) {
        super();
        this.state = {
            todos    : [],
            tmpTodos : [],
            checkedAll : false,
            filter   : 'all'
        };
        this.toggle        = this.toggle.bind(this);
        this.delete        = this.delete.bind(this);
        this.add           = this.add.bind(this);
        this.filter        = this.filter.bind(this);
        this.toggleAll     = this.toggleAll.bind(this);
    }

    componentDidMount() {
        this.getAll();
    }

    getAll() {
        fetch('http://localhost:3001')
        .then((data) => data.json())
        .then((data) => { this.setState({todos: data})})
    }

    toggle(id) {
        fetch('http://localhost:3001/' + id + '/toggle', {
            method: 'POST'
        })
        .then(() => fetch('http://localhost:3001'))
        .then((data) => data.json())
        .then((data) => {this.setState({todos: data})})
    }

    delete(id, e) {
        fetch('http://localhost:3001/' + id, {
            method: 'DELETE'
        })
        .then(() => fetch('http://localhost:3001'))
        .then((data) => data.json())
        .then((data) => {this.setState({todos: data})});

        e.preventDefault();
        e.stopPropagation();

        return false;
    }

    add(title) {
        fetch('http://localhost:3001', {
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body   : JSON.stringify({title: title})
        })
        .then(() => fetch('http://localhost:3001'))
        .then((data) => data.json())
        .then((data) => {this.setState({todos: data, newTodo: ''})})
    }

    filter(type) {
        if(type !== 'all') {
            fetch('http://localhost:3001/filter/' + type)
            .then((data) => data.json())
            .then((data) => { this.setState({todos: data})});
        }else {
            this.getAll();
        }

        this.setState({ filter: type });
    }

    toggleAll(checkedAll) {
        fetch('http://localhost:3001/toggleAll', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body   : JSON.stringify({checkedAll: checkedAll})
        })
        .then(() => fetch('http://localhost:3001'))
        .then((data) => data.json())
        .then((data) => { this.setState({todos: data, checkedAll: checkedAll})});
    }

    render() {
        return <div className="todoApp">
            <div className="todoApp__header">
                <h1 className="todoApp__header--title"> Todo List </h1>
                <TodoInput onAdd={this.add} />
                <TodoToggleAll onToggleAll={this.toggleAll} checkedAll={this.state.checkedAll} />
                <TodoFilter onFilter={ this.filter } type={this.state.filter} />
            </div>
            <TodoList items={this.state.todos} onToggle={this.toggle} onDelete={this.delete}/>
        </div>;
    }
}
