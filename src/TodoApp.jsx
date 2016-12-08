import React from 'react';
import 'whatwg-fetch';
import styles from './public/css/styles.scss';

export default class TodoApp extends React.Component {
	constructor(props) {
		super()

		this.api_url = 'http://localhost:3000';

		this.state = {
			todos:		[],
			newTodo:	'',
			alert:		''
		};

		this.toggle			= this.toggle.bind(this);
		this.delete			= this.delete.bind(this);
		this.add			= this.add.bind(this);
		this.newTodoChange	= this.newTodoChange.bind(this);
	}

	componentDidMount() {
		fetch(this.api_url + '/api/todo/get')
			.then((data) =>
				data.json()
			)
			.then((data) => {
				this.setState({
					todos: data
				})
			})
	}

	toggle(id) {
		fetch(this.api_url + '/api/todo/' + id + '/toggle', {
			method: 'POST'
		})
			.then(() =>
				fetch(this.api_url + '/api/todo/get')
			)
			.then((data) =>
				data.json()
			)
			.then((data) => {
				this.setState({
					todos: data
				})
			})
	}

	delete(id,e) {
		fetch(this.api_url + '/api/todo/delete/' + id, {
			method: 'DELETE'
		})
			.then(() =>
				fetch(this.api_url + '/api/todo/get')
			)
			.then((data) =>
				data.json()
			)
			.then((data) => {
				this.setState({
					todos: data
				})
			})

		e.preventDefault();
		e.stopPropagation();

		return false;
	}

	add(title) {
		if(title != '') {
			fetch(this.api_url + '/api/todo/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: title
				})
			})
				.then(() =>
					fetch(this.api_url + '/api/todo/get')
				)
				.then((data) =>
					data.json())
				.then((data) => {
					this.setState({
						todos:		data,
						newTodo:	'',
						alert:		''
					})
				})
		}
		else {
			this.setState({
				alert: 'Please enter your new to-do !'
			})
		}
	}

	newTodoChange(e) {
		this.setState({
			newTodo: e.target.value
		})
	}

	render() {
		return <div>
			<div>
				<p className="alert">
					{ this.state.alert }
				</p>
				<input type="text" onChange={ this.newTodoChange } value={ this.state.newTodo } required />
				<button onClick={ this.add.bind(this, this.state.newTodo) }>
					Add
				</button>
			</div>
			<ul>
				{
					this.state.todos && this.state.todos.map((todo) =>
						<li key={ todo._id } style={{ textDecoration: todo.done ? 'line-through' : 'initial' }} onClick={ this.toggle.bind(this, todo._id) }>
							{ todo.title }
							&nbsp;&nbsp;&nbsp;
							<button onClick={ this.delete.bind(this, todo._id) }>
								Delete
							</button>
						</li>
					)
				}
			</ul>
		</div>;
	}
}
